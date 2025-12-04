import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [students, setStudents] = useState([]);

    // State form
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [stuClass, setStuClass] = useState("");

    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // State sắp xếp
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // HÀM GỌI API (Đã nâng cấp để hỗ trợ tìm kiếm server-side)
    const fetchStudents = (keyword = "") => {
        // Gọi API kèm query param ?name=... 
        const url = keyword
            ? `http://localhost:5000/api/students?name=${keyword}`
            : 'http://localhost:5000/api/students';

        axios.get(url)
            .then(response => setStudents(response.data))
            .catch(error => console.error("Lỗi khi fetch:", error));
    };

    // Gọi lần đầu
    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchStudents(searchTerm);
        }, 500); // Đợi 0.5s sau khi ngừng gõ mới gọi server

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    // Hàm thêm
    const handleAddStudent = (e) => {
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
        const newStu = { name, age: Number(age), class: stuClass };
        axios.post('http://localhost:5000/api/students', newStu)
            .then(res => {
                // Sau khi thêm, gọi lại fetchStudents để cập nhật danh sách chuẩn từ server
                fetchStudents(searchTerm);
                setName(""); setAge(""); setStuClass("");
                setMessage("✅ Thêm học sinh thành công!");
                setTimeout(() => setMessage(""), 3000);
            })
            .catch(err => {
                const errorMsg = err.response?.data?.error || "Có lỗi xảy ra!";
                setMessage(`❌ ${errorMsg}`);
            });
    };

    // Hàm xóa
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa?")) {
            axios.delete(`http://localhost:5000/api/students/${id}`)
                .then(() => {
                    fetchStudents(searchTerm); // Refresh lại list từ server
                    setMessage("Đã xóa thành công!");
                    setTimeout(() => setMessage(""), 3000);
                })
                .catch(err => console.error("Lỗi xóa:", err));
        }
    };

    // LOGIC SẮP XẾP KHI CLICK TIÊU ĐỀ 
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Hàm thực hiện sắp xếp trên Client (sau khi đã lấy dữ liệu search từ Server)
    const sortedStudents = [...students].sort((a, b) => {
        if (!sortConfig.key) return 0;

        // Xử lý so sánh
        let valA = a[sortConfig.key];
        let valB = b[sortConfig.key];

        // Nếu là chuỗi thì uppercase để so sánh đúng [cite: 340]
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
    });

    // Helper để hiển thị mũi tên chỉ hướng sắp xếp
    const getSortIcon = (colName) => {
        if (sortConfig.key !== colName) return " ↕"; // Mặc định
        return sortConfig.direction === 'ascending' ? " ↑" : " ↓";
    };

    return (
        <div className="container mt-4"> {/* Container Bootstrap */}
            <h1 className="text-center mb-4 text-primary">Quản lý Học sinh</h1>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="row mb-4">
                {/* Form Thêm - Sử dụng Grid của Bootstrap */}
                <div className="col-md-5">
                    <div className="card p-3 shadow-sm">
                        <h4 className="card-title mb-3">Thêm mới</h4>
                        <form onSubmit={handleAddStudent}>
                            <div className="mb-2">
                                <input className="form-control" type="text" placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} required />
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="number" placeholder="Tuổi" value={age} onChange={e => setAge(e.target.value)} required />
                            </div>
                            <div className="mb-2">
                                <input className="form-control" type="text" placeholder="Lớp" value={stuClass} onChange={e => setStuClass(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Thêm học sinh</button>
                        </form>
                    </div>
                </div>

                {/* Phần Tìm kiếm và Danh sách */}
                <div className="col-md-7">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="🔍 Nhập tên để tìm kiếm..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    {/* Click vào tiêu đề để sắp xếp  */}
                                    <th onClick={() => requestSort('name')} style={{ cursor: 'pointer' }}>
                                        Họ Tên {getSortIcon('name')}
                                    </th>
                                    <th onClick={() => requestSort('age')} style={{ cursor: 'pointer' }}>
                                        Tuổi {getSortIcon('age')}
                                    </th>
                                    <th onClick={() => requestSort('class')} style={{ cursor: 'pointer' }}>
                                        Lớp {getSortIcon('class')}
                                    </th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedStudents.length > 0 ? (
                                    sortedStudents.map((student) => (
                                        <tr key={student._id}>
                                            <td>{student.name}</td>
                                            <td>{student.age}</td>
                                            <td>{student.class}</td>
                                            <td>
                                                <Link to={`/edit/${student._id}`} className="btn btn-sm btn-warning me-2">
                                                    Sửa
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(student._id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">Không tìm thấy dữ liệu</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;