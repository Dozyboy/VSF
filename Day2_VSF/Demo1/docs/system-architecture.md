# System Architecture

> Tài liệu mô tả kiến trúc mục tiêu; Calculator App chưa được triển khai.

## Overview

Ứng dụng mục tiêu là một máy tính chạy hoàn toàn trong trình duyệt, gồm một trang HTML, lớp trình bày CSS và JavaScript phía client. Ứng dụng thực hiện bốn phép toán cơ bản, nhận chuột hoặc bàn phím và hiển thị lịch sử tính toán.

## Components

- `index.html` (dự kiến): cấu trúc semantic, màn hình, bàn phím số/phép toán và vùng lịch sử.
- `style.css` (dự kiến): dark mode glassmorphism, trạng thái hover/click/focus và responsive.
- `app.js` (dự kiến): trạng thái nhập liệu, phép tính, ánh xạ bàn phím, render kết quả và lịch sử.
- `app.test.js` (dự kiến): kiểm thử logic số học và các trường hợp biên đã thống nhất.

## Data flow

Sự kiện click hoặc keydown được chuẩn hóa thành hành động máy tính; logic cập nhật biểu thức/trạng thái, tính kết quả rồi render màn hình và lịch sử. Trạng thái đang chạy nằm ở bộ nhớ trình duyệt. Persistence lịch sử và giới hạn lưu giữ: `TBD`.

## External dependencies

Không cần API, máy chủ hay datastore cho phạm vi mục tiêu ban đầu. Test runner/package tooling và khả năng dùng font hoặc tài nguyên bên ngoài: `TBD`.

## Boundaries & trust

Mọi xử lý diễn ra trong trình duyệt; dữ liệu nhập từ UI và bàn phím là không đáng tin cậy và phải được giới hạn vào tập lệnh hợp lệ. Không có xác thực hoặc dữ liệu bí mật trong phạm vi mục tiêu.

## Key decisions

- Kiến trúc static, client-only phù hợp với phạm vi nhỏ và có thể triển khai trên static hosting.
- Tách cấu trúc, trình bày, logic và test thành bốn tệp theo yêu cầu.
- Logic tính toán cần có ranh giới có thể kiểm thử độc lập với DOM; hình thức export/module cụ thể là `TBD` theo test runner.
- Không dùng `eval` hoặc thực thi chuỗi tùy ý để giảm rủi ro và giữ hành vi có thể dự đoán.

## Constraints & non-goals

Phạm vi chỉ gồm `+`, `-`, `*`, `/`, hỗ trợ bàn phím, lịch sử, responsive và kiểm thử logic. Không bao gồm backend, tài khoản, đồng bộ đa thiết bị, phép toán khoa học hoặc offline/PWA trừ khi kế hoạch sau này mở rộng rõ ràng. Hosting là `TBD`.

