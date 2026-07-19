#!/usr/bin/env pwsh
<#
.SYNOPSIS
  Install a harness bundle into a target repo - the Windows/PowerShell sibling of install.sh.

.DESCRIPTION
  One shot, no follow-up commands to chain by hand. In order:
    1. verify the sha256 sidecar (if present)
    2. extract the bundle to a temp dir
    3. check dependencies first - fail fast with the exact pip command if any
       are missing, before touching the target
    4. install into the target and verify it (--strict: a drifted install fails)
    5. run the harness test suite against the freshly installed copy

  Step 5 runs by default; pass -SkipTests to skip the suite (it takes ~30s). The
  integrity check in step 4 already confirms the install; the suite is the extra
  "does it run green in my environment" pass.

  The REVIEWERS env var (comma-separated emails) seeds the approval roster without
  a prompt - useful when this script is piped and has no TTY to ask on. On a TTY
  install.py prompts and suggests a reviewer from git config.

  Compatible with Windows PowerShell 5.1 and PowerShell 7+.

.PARAMETER Bundle
  Path to the harness-vX.Y.Z.tar.gz bundle (required, positional).

.PARAMETER Target
  Target repo root to install into (positional, default: current directory).

.PARAMETER SkipTests
  Skip the post-install test suite. Alias -NoTests mirrors the shell flag.

.EXAMPLE
  pwsh -File release\install.ps1 .\harness-v3.0.0.tar.gz C:\src\my-repo

.EXAMPLE
  $env:REVIEWERS = 'lead@example.com'; .\release\install.ps1 .\harness-v3.0.0.tar.gz
#>
[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$Bundle,

    [Parameter(Position = 1)]
    [string]$Target,

    [Alias('NoTests')]
    [switch]$SkipTests
)

# set -eu equivalent: throw on cmdlet errors. Native commands (python) do NOT trip
# this - every external call below checks $LASTEXITCODE explicitly.
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ([string]::IsNullOrEmpty($Bundle)) {
    Write-Error 'usage: install.ps1 <harness-vX.Y.Z.tar.gz> [target-dir] [-SkipTests]'
    exit 2
}
if (-not (Test-Path -LiteralPath $Bundle -PathType Leaf)) {
    Write-Error "bundle not found: $Bundle"
    exit 2
}
$Bundle = (Resolve-Path -LiteralPath $Bundle).Path
if ([string]::IsNullOrEmpty($Target)) { $Target = (Get-Location).Path }

# --- Python invocation helper ---------------------------------------------------
# The interpreter command differs by platform: the `py -3` launcher is the most
# reliable on Windows and sidesteps the App Execution Alias stub (a 0-byte
# python.exe that opens the Microsoft Store and never runs code). Probe py -3
# first, then python, then python3, and pin the first Python >=3.9 found.
#
# Callers pass a SINGLE array so dash-prefixed args (-m, --source) land verbatim
# as python args instead of being parsed as this function's parameters.
$script:PyExe = $null
$script:PyBase = @()

function Invoke-Py {
    param([Parameter(Mandatory = $true)][string[]]$PyArgs)
    & $script:PyExe @($script:PyBase + $PyArgs)
}

$probe = 'import sys; raise SystemExit(0 if sys.version_info >= (3, 9) else 1)'
foreach ($cand in @(
        @{ exe = 'py';      base = @('-3') },
        @{ exe = 'python';  base = @() },
        @{ exe = 'python3'; base = @() })) {
    if (-not (Get-Command $cand.exe -ErrorAction SilentlyContinue)) { continue }
    try {
        & $cand.exe @($cand.base + @('-c', $probe)) 2>$null
    } catch { continue }
    if ($LASTEXITCODE -eq 0) {
        $script:PyExe = $cand.exe
        $script:PyBase = $cand.base
        break
    }
}
if (-not $script:PyExe) {
    Write-Error @'
no Python >=3.9 found (looked for: py -3, python, python3). The harness runs on
Python - its hooks execute as Python scripts, so the target machine needs it too.
Install Python 3, then re-run:
    Windows: https://www.python.org/downloads/  (tick "Add python.exe to PATH")
             or:  winget install Python.Python.3
'@
    exit 1
}
# install.py wires THIS interpreter into the hook commands.
$env:HARNESS_PY = $script:PyExe

# 1. verify the bundle before trusting its contents -----------------------------
$sidecar = "$Bundle.sha256"
if (Test-Path -LiteralPath $sidecar -PathType Leaf) {
    Write-Host "verifying $sidecar ..."
    # sha256sum sidecar format: "<hex>  <filename>" - take the first token.
    $expected = ((Get-Content -LiteralPath $sidecar -TotalCount 1) -split '\s+')[0].ToLowerInvariant()
    $actual = (Get-FileHash -LiteralPath $Bundle -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($expected -ne $actual) {
        Write-Error "checksum mismatch for $Bundle`n  expected: $expected`n  actual:   $actual"
        exit 1
    }
    Write-Host '  checksum OK'
}

# 2. extract to a temp tree (the installer reads from here) ----------------------
$Work = Join-Path ([System.IO.Path]::GetTempPath()) ("harness-install-" + [System.IO.Path]::GetRandomFileName())
New-Item -ItemType Directory -Path $Work -Force | Out-Null
try {
    # 2a. validate members cannot escape the extract dir, THEN extract - both via
    #     Python tarfile. Expand-Archive only handles .zip, so leaning on tarfile
    #     keeps this portable and drops any dependency on tar.exe. The checksum step
    #     above is skipped when no sidecar exists, so a MITM'd bundle is the threat:
    #     reject any absolute path, '..' traversal, or out-of-tree link member
    #     before writing anything. Written to a temp .py (ASCII) and run as a file
    #     to avoid PS-version stdin-encoding quirks.
    $guard = @'
import os, sys, tarfile
bundle, dest = sys.argv[1], sys.argv[2]
with tarfile.open(bundle, "r:gz") as tf:
    for m in tf.getmembers():
        name = m.name
        if os.path.isabs(name) or name.startswith("/"):
            sys.exit("refusing tarball: absolute member path %r" % name)
        norm = os.path.normpath(name)
        if norm == ".." or norm.startswith(".." + os.sep):
            sys.exit("refusing tarball: path-traversal member %r" % name)
        if m.issym() or m.islnk():
            tgt = m.linkname
            joined = os.path.normpath(os.path.join(os.path.dirname(name), tgt))
            if os.path.isabs(tgt) or joined.startswith(".."):
                sys.exit("refusing tarball: unsafe link %r -> %r" % (name, tgt))
    try:
        tf.extractall(dest, filter="data")  # py3.12+: explicit safe filter (we already validated)
    except TypeError:
        tf.extractall(dest)                 # py<3.9.17: no filter arg; manual guard above stands
'@
    $guardPy = Join-Path $Work '_extract_guard.py'
    Set-Content -LiteralPath $guardPy -Value $guard -Encoding ascii
    Invoke-Py @($guardPy, $Bundle, $Work)
    if ($LASTEXITCODE -ne 0) { Write-Error 'bundle validation/extract failed'; exit 1 }
    Remove-Item -LiteralPath $guardPy -Force -ErrorAction SilentlyContinue

    # 3. dependencies first - the installer and the harness both need them ----------
    Write-Host 'checking dependencies ...'
    Invoke-Py @((Join-Path $Work 'harness\scripts\preflight_deps.py'))
    if ($LASTEXITCODE -ne 0) { Write-Error 'dependency preflight failed'; exit $LASTEXITCODE }

    # 3b. snapshot the EXISTING install's manifest BEFORE the copy overwrites it, so
    #     cleanup (step 4b) can tell version-dropped files from user-added ones.
    #     Absent on a first install -> $OldManifest stays empty -> cleanup is a no-op.
    $OldManifest = ''
    $targetManifest = Join-Path $Target 'harness\manifest.json'
    if (Test-Path -LiteralPath $targetManifest -PathType Leaf) {
        $OldManifest = Join-Path $Work 'old-manifest.json'
        Copy-Item -LiteralPath $targetManifest -Destination $OldManifest -Force
    }

    # 4. install + verify (--strict fails this script on drift) ---------------------
    Write-Host "installing harness into $Target ..."
    $installPy = Join-Path $Work 'harness\install\install.py'
    $installArgs = @($installPy, '--source', $Work, '--target', $Target, '--strict')
    if ($env:REVIEWERS) { $installArgs += @('--reviewers', $env:REVIEWERS) }
    Invoke-Py $installArgs
    if ($LASTEXITCODE -ne 0) { Write-Error 'install/verify failed'; exit $LASTEXITCODE }

    # 4b. clean up files the previous version left behind (safe layer only). This must
    #     NEVER fail the install - the harness is already copied + verified - so the
    #     call is guarded: a cleanup error just defers to the manual door.
    if ($OldManifest) {
        # persist the snapshot durably so a later hs:cleanup can reach the deferred
        # (modified) layer - harness/state/ is preserved across installs.
        $stateDir = Join-Path $Target 'harness\state'
        New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
        try { Copy-Item -LiteralPath $OldManifest -Destination (Join-Path $stateDir 'cleanup-prev-manifest.json') -Force } catch {}
        Write-Host 'cleaning up files dropped by the previous version ...'
        Invoke-Py @((Join-Path $Work 'harness\scripts\cleanup_orphans.py'), '--target', $Target, '--old-manifest', $OldManifest, '--apply')
        if ($LASTEXITCODE -ne 0) { Write-Host "  cleanup deferred - run hs:cleanup in $Target to review" }
    }

    # 5. run the suite against the installed copy (default; -SkipTests to skip) ------
    if ($SkipTests) {
        Write-Host 'skipping the harness test suite (-SkipTests).'
    } else {
        Write-Host "running the harness test suite in $Target (use -SkipTests to skip) ..."
        Push-Location $Target
        try {
            Invoke-Py @('-m', 'pytest', 'harness/tests/', '-q')
            if ($LASTEXITCODE -ne 0) { Write-Error 'harness test suite failed'; exit $LASTEXITCODE }
        } finally {
            Pop-Location
        }
    }
} finally {
    # trap 'rm -rf "$WORK"' EXIT - fires on success, error, or Ctrl-C.
    if (Test-Path -LiteralPath $Work) {
        Remove-Item -LiteralPath $Work -Recurse -Force -ErrorAction SilentlyContinue
    }
}

if ($script:PyBase.Count -gt 0) {
    $pyDisplay = "$($script:PyExe) $($script:PyBase -join ' ')"
} else {
    $pyDisplay = $script:PyExe
}
Write-Host 'done.'
Write-Host '  - enable the hs plugin: run /reload-plugins in Claude Code (or restart it)'
Write-Host "  - re-verify any time: $pyDisplay `"$Target\harness\scripts\verify_install.py`" --strict"
if ($SkipTests) {
    Write-Host "  - run the suite later: cd `"$Target`"; $pyDisplay -m pytest harness/tests/ -q"
}
