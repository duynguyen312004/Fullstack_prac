🎓 Ứng Dụng Quản Lý Học Sinh (MERN Stack + Docker)

Ứng dụng quản lý học sinh đơn giản nhưng đầy đủ tính năng, được xây dựng theo mô hình MERN Stack (MongoDB, Express, React, Node.js).
Dự án sử dụng Docker để chạy MongoDB và Bootstrap 5 để làm giao diện trực quan – dễ dùng.

🚀 Tính Năng Chính
📌 Quản lý dữ liệu (CRUD)

Xem danh sách học sinh

Thêm học sinh mới (validate: tên ≥ 2 ký tự, tuổi 6–100)

Sửa thông tin học sinh

Xóa học sinh (có hộp thoại xác nhận)

🔎 Tìm kiếm & Sắp xếp

Tìm kiếm theo tên (Server-side filtering)

Sắp xếp theo:

Tên

Tuổi

Lớp

(Click vào header bảng để sắp xếp)

🎨 Giao diện

Responsive với Bootstrap 5

Toast / Alert thông báo khi thao tác thành công hoặc lỗi

🛠️ Công Nghệ Sử Dụng
Frontend

React.js

Axios

Bootstrap 5

React Router DOM

Backend

Node.js + Express

Mongoose

CORS

Database & DevOps

MongoDB

Docker & Docker Compose

⚙️ Hướng Dẫn Cài Đặt
1️⃣ Yêu cầu

Node.js ≥ 14

Docker Desktop (đã cài và bật lên)

2️⃣ Cách chạy dự án

Project gồm 2 thư mục:

backend/
student-management/   # frontend

▶️ Bước 1: Khởi động MongoDB bằng Docker

Trong thư mục backend/:

cd backend
docker-compose up -d


Lưu ý: Nếu máy bạn có MongoDB service đang chạy, hãy tắt nó để tránh xung đột cổng 27017.

▶️ Bước 2: Khởi động Backend
npm install
node index.js


Backend chạy tại:
👉 http://localhost:5000

▶️ Bước 3: Khởi động Frontend
cd ../student-management
npm install
npm start


Frontend chạy tại:
👉 http://localhost:3000

🐛 Khắc Phục Lỗi Thường Gặp
1. ❌ Lỗi “MongoDB Connection Refused”

Docker Desktop chưa bật

Container MongoDB chưa chạy:

docker ps


Một MongoDB khác đang chiếm cổng 27017 → tắt hoặc đổi cổng

2. ❌ Lỗi CORS

Đảm bảo backend đã có:

app.use(cors());


Khởi động lại backend sau khi sửa

3. ❌ Không chạy được npm install

Xóa thư mục node_modules và package-lock.json, sau đó chạy lại:

npm install

📂 Cấu Trúc Thư Mục
student_management/
│
├── backend/
│   ├── index.js
│   ├── Student.js
│   ├── docker-compose.yml
│   └── mongodbdata/
│
└── student-management/   # React frontend
    ├── src/
    │   ├── App.js
    │   ├── Home.js
    │   ├── EditStudent.js
    │   └── ...
    ├── public/
    └── package.json

✨ Ghi Chú

Dự án thích hợp cho sinh viên học MERN Stack, xử lý CRUD, Docker, REST API.

Mã nguồn dễ hiểu, cấu trúc rõ ràng, có thể mở rộng thành dự án lớn hơn.
