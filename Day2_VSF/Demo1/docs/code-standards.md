# Code Standards

> Quy chuẩn áp dụng cho mã nguồn mục tiêu; Calculator App chưa được triển khai.

## Languages & conventions

Dùng HTML5 semantic, CSS thuần và JavaScript hiện đại. Tên JavaScript dùng `camelCase`, hằng số dùng `UPPER_SNAKE_CASE`, class CSS dùng kebab-case. Ưu tiên hàm nhỏ, tên thể hiện ý định, `const` mặc định và `let` khi cần gán lại; tránh biến toàn cục và `eval`.

## Project layout

Các tệp ứng dụng mục tiêu nằm ở root: `index.html`, `style.css`, `app.js`, `app.test.js`. Tài liệu nằm trong `docs/`; kế hoạch và báo cáo nằm trong `plans/`. Không sửa nội dung vendored trong `harness/` cho tính năng ứng dụng.

## Testing

Phát triển logic theo vòng red → green → refactor. `app.test.js` phải bao phủ bốn phép toán, số âm/thập phân và các lỗi như chia cho 0 hoặc đầu vào không hợp lệ sau khi hành vi mong đợi được chốt. Test runner và lệnh chạy chuẩn: `TBD`; phải xác minh bằng lần chạy thật trước khi báo đạt.

## Error handling & logging

Không để lỗi đầu vào làm hỏng UI. Hiển thị thông báo ngắn, dễ hiểu và giữ ứng dụng ở trạng thái có thể tiếp tục. Không ghi log dữ liệu không cần thiết; console logging chỉ phục vụ phát triển và phải được loại bỏ hoặc kiểm soát trước khi phát hành. Cách hiển thị lỗi chia cho 0: `TBD`.

## Security & secrets

Không đưa secret vào mã client hoặc repository. Chỉ chấp nhận các token/phím được hỗ trợ, render dữ liệu bằng API text an toàn và không thực thi biểu thức dưới dạng code. Nếu thêm dependency, phải có lý do, khóa phiên bản phù hợp và rà soát nguồn/gói.

## Commits & review

Commit nên nhỏ, tập trung và mô tả ở thể mệnh lệnh; format commit bắt buộc và branch policy: `TBD`. Review phải kiểm tra yêu cầu, accessibility cơ bản, responsive, trạng thái bàn phím, test tự động và không tuyên bố hành vi chưa được chạy xác minh.

