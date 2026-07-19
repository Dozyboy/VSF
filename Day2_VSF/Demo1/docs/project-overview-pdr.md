# Project Overview / PDR

## Tầm nhìn

Xây dựng Calculator App web nhỏ gọn, dễ dùng trên desktop và mobile, có giao diện dark glassmorphism sang trọng, phản hồi mượt và logic được kiểm thử.

## Người dùng mục tiêu

Người dùng cần thực hiện nhanh các phép tính số học cơ bản bằng chuột, cảm ứng hoặc bàn phím mà không cần đăng nhập.

## Yêu cầu chức năng mục tiêu

- Thực hiện cộng, trừ, nhân và chia.
- Nhập và điều khiển bằng các nút trên giao diện.
- Hỗ trợ phím số, toán tử và các phím điều khiển phù hợp; ánh xạ chính xác là `TBD`.
- Hiển thị kết quả và lưu/hiển thị lịch sử tính toán.
- Cơ chế persistence, giới hạn và thao tác xóa lịch sử là `TBD`.
- Có bộ kiểm thử logic trong `app.test.js`.

## Yêu cầu phi chức năng mục tiêu

- `index.html` theo HTML5 semantic, có title, description, viewport và cấu trúc heading hợp lý.
- Giao diện dark mode, glassmorphism, hover/click/focus mượt và responsive.
- Có khả năng sử dụng bằng bàn phím; focus phải nhìn thấy được.
- Không thực thi chuỗi nhập tùy ý như mã JavaScript.
- Không cần backend cho phiên bản đầu tiên.

## Tiêu chí chấp nhận cấp sản phẩm

- Bốn phép toán cho kết quả đúng với các ca kiểm thử đã chốt.
- Người dùng thao tác được bằng click/touch và bàn phím.
- Lịch sử hiển thị chính xác các phép tính hoàn tất theo chính sách được chốt.
- UI không tràn hoặc mất khả năng thao tác trên viewport mục tiêu (`TBD`).
- Bộ test chạy thành công bằng lệnh chuẩn sau khi test runner được chọn.

## Ràng buộc và giả định

- Công nghệ mục tiêu là HTML, CSS và JavaScript phía client.
- Hiện chưa có mã ứng dụng; mọi nội dung trên là yêu cầu dự kiến.
- Test runner, browser support, history persistence, retention và deployment host đều `TBD`.

