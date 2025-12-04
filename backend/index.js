const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Student = require('./Student');

const app = express();
const PORT = 5000;

//Middleware
app.use(cors());
app.use(bodyParser.json());

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/student_db').then(() => {
    console.log('Connected to MongoDB');
}
).catch(err => {
    console.error('Error connecting to MongoDB', err);
}
);

// API GET: Lấy danh sách (Có hỗ trợ tìm kiếm server-side)
app.get('/api/students', async (req, res) => {
    try {
        const { name } = req.query; // Lấy tham số ?name=... từ URL

        let query = {};
        if (name) {
            // Sử dụng $regex để tìm gần đúng, 'i' để không phân biệt hoa thường [cite: 302]
            query.name = { $regex: name, $options: 'i' };
        }

        const students = await Student.find(query);
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// API GET: Lấy chi tiết một học sinh theo ID
app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//API POST them hoc sinh moi
app.post('/api/students', async (req, res) => {
    try {
        // tao mot ban ghi moi tu du lieu gui len ( req.body)
        const newStudent = await Student.create(req.body);
        // tra ve ban ghi moi tao
        res.status(201).json(newStudent);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// API PUT: Cập nhật thông tin học sinh theo ID
app.put('/api/students/:id', async (req, res) => {
    try {
        const updatedStu = await Student.findByIdAndUpdate(
            req.params.id, // Lấy ID từ URL
            req.body,      // Dữ liệu mới từ client
            { new: true }  // Trả về dữ liệu SAU khi update thay vì dữ liệu cũ
        );

        if (!updatedStu) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json(updatedStu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// API DELETE: Xóa học sinh theo ID
app.delete('/api/students/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await Student.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ error: "Student not found" });
        }
        res.json({ message: "Đã xóa học sinh", id: deleted._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});