import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State dữ liệu
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [stuClass, setStuClass] = useState("");

    // State thông báo
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Load thông tin học sinh khi vào trang
    useEffect(() => {
        // Gọi API lấy chi tiết 1 học sinh theo ID
        axios.get(`http://localhost:5000/api/students/${id}`)
            .then(res => {
                const { name, age, class: className } = res.data;
                setName(name);
                setAge(age);
                setStuClass(className);
            })
            .catch(err => {
                console.error("Lỗi fetch chi tiết:", err);
                setError("Không tìm thấy học sinh hoặc lỗi kết nối!");
            });
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        // --- PHẦN VALIDATION (CHECK ĐIỀU KIỆN) ---
        // 1. Check Tuổi
        const ageNumber = Number(age);
        if (ageNumber < 6 || ageNumber > 100) {
            setMessage("❌ Lỗi: Tuổi học sinh phải từ 6 đến 100!");
            return; // Dừng ngay, không gửi API
        }

        // 2. Check Tên
        if (name.trim().length < 2) {
            setMessage("❌ Lỗi: Tên quá ngắn (tối thiểu 2 ký tự)!");
            return;
        }
        // ------------------------------------------
        const updatedInfo = { name, age: Number(age), class: stuClass };

        axios.put(`http://localhost:5000/api/students/${id}`, updatedInfo)
            .then(res => {
                // Hiện thông báo thành công
                setMessage("Cập nhật thành công! Đang quay về trang chủ...");
                setError(""); // Xóa lỗi nếu có trước đó

                // Đợi 1.5 giây để người dùng đọc thông báo rồi mới chuyển trang
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            })
            .catch(err => {
                console.error("Lỗi cập nhật:", err);
                setError("Có lỗi xảy ra khi cập nhật. Vui lòng thử lại.");
                setMessage("");
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    {/* Card Bootstrap cho Form */}
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">Chỉnh sửa thông tin</h4>
                        </div>
                        <div className="card-body">

                            {/* Khu vực hiển thị thông báo */}
                            {message && <div className="alert alert-success">{message}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Họ tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Tuổi</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={age}
                                        onChange={e => setAge(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Lớp</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={stuClass}
                                        onChange={e => setStuClass(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-4">
                                    {/* Nút Quay lại */}
                                    <Link to="/" className="btn btn-secondary">
                                        &larr; Quay lại
                                    </Link>

                                    {/* Nút Lưu */}
                                    <button type="submit" className="btn btn-success fw-bold">
                                        Lưu thay đổi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;