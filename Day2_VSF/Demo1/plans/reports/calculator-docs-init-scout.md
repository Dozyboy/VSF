# Scout Report — Calculator docs initialization

## Relevant files

- `CLAUDE.md` — repository workflow constraints and harness usage.
- `harness/scripts/scaffold_standards.py` — canonical section templates for the two standards documents.

## Observed patterns

- No application source files exist outside the vendored `harness/` directory.
- The requested product is a browser-based calculator using `index.html`, `style.css`, `app.js`, and `app.test.js`.
- Required behavior: four arithmetic operations, keyboard input, calculation history, dark glassmorphism UI, responsiveness, and logic tests.
- Documentation must describe the agreed target architecture and label undecided details as TBD; it must not claim that unimplemented behavior exists.

## Open questions

- Test runner/package tooling has not yet been selected.
- History persistence mechanism and retention limit have not yet been finalized.
- Deployment host has not yet been selected.
