# 🎓 Ứng Dụng Quản Lý Học Sinh (MERN Stack + Docker)

Đây là ứng dụng web quản lý học sinh đơn giản nhưng đầy đủ tính năng, được xây dựng theo mô hình **MERN Stack** (MongoDB, Express, React, Node.js). Dự án sử dụng **Docker** để khởi tạo database và **Bootstrap** để tối ưu hóa giao diện người dùng.

## 🚀 Tính Năng Chính

* **Quản lý dữ liệu (CRUD):**
    * Xem danh sách học sinh.
    * Thêm học sinh mới (có kiểm tra dữ liệu đầu vào: Tên > 2 ký tự, Tuổi 6-100).
    * Sửa thông tin học sinh.
    * Xóa học sinh (có hộp thoại xác nhận an toàn).
* **Tìm kiếm & Sắp xếp:**
    * Tìm kiếm học sinh theo tên (Server-side Filtering).
    * Sắp xếp danh sách theo Tên, Tuổi, Lớp (Click vào tiêu đề cột).
* **Giao diện:**
    * Responsive, đẹp mắt sử dụng Bootstrap 5.
    * Thông báo phản hồi (Toast/Alert) khi thao tác thành công hoặc lỗi.

## 🛠️ Công Nghệ Sử Dụng

### Frontend
* **React.js**: Thư viện xây dựng giao diện.
* **Axios**: Gọi API tới Backend.
* **Bootstrap 5**: CSS Framework.
* **React Router DOM**: Điều hướng trang.

### Backend
* **Node.js & Express**: RESTful API Server.
* **Mongoose**: ODM làm việc với MongoDB.
* **Cors**: Xử lý Cross-Origin Resource Sharing.

### Database & DevOps
* **MongoDB**: Cơ sở dữ liệu NoSQL.
* **Docker & Docker Compose**: Đóng gói và chạy container MongoDB.

---

## ⚙️ Hướng Dẫn Cài Đặt

### 1. Yêu cầu tiên quyết
* [Node.js](https://nodejs.org/) (v14 trở lên).
* [Docker Desktop](https://www.docker.com/products/docker-desktop) (đã cài đặt và đang chạy).

### 2. Cài đặt & Chạy dự án

Dự án gồm 2 thư mục chính: `backend` và `student-management` (frontend).

#### Bước 1: Khởi động Database (Docker)
Di chuyển vào thư mục backend và chạy MongoDB:

cd backend
# Khởi tạo container MongoDB (cổng 27017)
docker-compose up -d
Lưu ý: Đảm bảo bạn đã tắt MongoDB Service cài sẵn trên máy (nếu có) để tránh xung đột cổng 27017.
Bước 2: Khởi động Backend Server
Tại thư mục backend, cài đặt thư viện và chạy server:
npm install
node index.js
Server sẽ chạy tại: http://localhost:5000
Bước 3: Khởi động Frontend (React)
Mở một terminal mới, di chuyển vào thư mục frontend:
cd ../student-management
npm install
npm start
Trang web sẽ tự động mở tại: http://localhost:3000

🐛 Khắc Phục Lỗi Thường Gặp
1. Lỗi kết nối MongoDB (Connection Refused)

Kiểm tra Docker Desktop đã bật chưa.

Kiểm tra xem có MongoDB nào khác đang chạy chiếm cổng 27017 không.

2. Lỗi CORS ở Frontend

Backend đã được cài đặt cors và app.use(cors()). Hãy chắc chắn bạn đã khởi động lại backend sau khi sửa code.

3. Không cài được npm install

Xóa thư mục node_modules và file package-lock.json rồi chạy lại npm install
