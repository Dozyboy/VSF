# 🔐 4 PHƯƠNG THỨC BẢO VỆ DỮ LIỆU ĐĂNG NHẬP (FRONTEND ➔ BACKEND)

Tài liệu này chi tiết hóa 4 phương thức bảo mật chuẩn quốc tế được sử dụng để bảo vệ **Username và Password** khi truyền từ Giao diện Frontend về Máy chủ Backend.

---

## 🔐 1. Giao thức HTTPS / TLS (Mã hóa đường truyền - Lớp bảo vệ số 1)

* **Cách hoạt động:** Trang web bắt buộc phải chạy trên giao thức **HTTPS** (có biểu tượng 🔒 Ổ khóa trên thanh địa chỉ trình duyệt).
* **Tác dụng:** Khi người dùng bấm "Đăng nhập", Username và Password sẽ được thuật toán mã hóa bất đối xứng (SSL/TLS) xáo trộn thành một dãy ký tự vô nghĩa ngay tại máy tính của người dùng trước khi phát đi qua mạng.
* **Chống lại:** Kẻ gian đứng cùng quán Wifi công cộng hay nhà mạng có dùng phần mềm bắt gói tin (Sniffer/Man-in-the-Middle) cũng **chỉ thu được rác mã hóa**, tuyệt đối không đọc được Password thật!

---

## 📦 2. Phương thức HTTP POST & Giấu dữ liệu trong Body (JSON Payload)

* **Cách hoạt động:** Dữ liệu đăng nhập bắt buộc phải gửi bằng phương thức **`POST`** và gói chặt bên trong **Request Body** dạng JSON:
  ```json
  {
    "username": "minh_admin",
    "password": "MySuperSecretPassword123!"
  }
  ```
* **Chống lại:** Tuyệt đối **KHÔNG gửi Password trên đường dẫn URL** (như `GET /login?user=abc&pass=123`). Vì nếu gửi trên URL, Password sẽ bị lưu lại trên Lịch sử trình duyệt (Browser History) và Server Access Log, rất dễ bị lộ.

---

## 🧂 3. Mã hóa băm Password phía Backend (Bcrypt / Argon2 With Salt)

* **Cách hoạt động:** Ngay khi Backend vừa nhận được Password từ Frontend gửi tới, Backend sẽ lập tức dùng thuật toán băm kèm muối (**Bcrypt / Argon2**) để biến Password thành một chuỗi Hash:
  `$2b$12$e8Kz...xyz`
* **Chống lại:** Password gốc dạng chữ thường **chỉ tồn tại trong 0.001 giây ở bộ nhớ RAM của Server** lúc kiểm tra, sau đó bị xóa ngay. Kẻ gian dù có hack được Database cũng chỉ thấy chuỗi băm rác, không bao giờ dịch ngược ra Password thật!

---

## ⏳ 4. Chống tấn công dò mật khẩu (Rate Limiting & Captcha)

* **Cách hoạt động:** Backend đặt một bộ đếm giới hạn số lần Đăng nhập sai ở cổng API Login (nhờ thư viện như `slowapi` trong Python).
* **Chống lại:** 
  * Nếu nhập sai quá 5 lần ➔ Server **tạm khóa IP/Tài khoản trong 15 phút**.
  * Hoặc bắt người dùng giải **Mã Captcha** (chọn hình ảnh/xác minh không phải là robot).
  * Giúp chống lại việc Hacker dùng phần mềm tự động chạy thử hàng triệu mật khẩu liên tục (Brute-Force Attack).

---

## 💡 TÓM TẮT QUY TRÌNH BẢO VỆ BỌC LÓT

1. **HTTPS (SSL/TLS):** Mã hóa dữ liệu trên đường truyền Wifi/Internet.
2. **HTTP POST Body:** Giấu dữ liệu không bị lộ trên thanh URL và Log.
3. **Bcrypt Hash:** Xóa vết mật khẩu gốc ở RAM Server và Database.
4. **Rate Limiting:** Chặn Hacker chạy thử hàng triệu mật khẩu tự động.

---

*Tài liệu được lưu trữ tự động tại thư mục VSF/Code.*
