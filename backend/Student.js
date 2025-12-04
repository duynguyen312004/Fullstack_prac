const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, "Tên không được để trống"], // Custom thông báo lỗi
        minlength: [2, "Tên phải có ít nhất 2 ký tự"]
    },
    age: {
        type: Number,
        required: [true, "Tuổi không được để trống"],
        min: [6, "Tuổi phải từ 6 trở lên"], // Check tối thiểu
        max: [100, "Tuổi không được quá 100"] // Check tối đa
    },
    class: {
        type: String,
        required: [true, "Lớp không được để trống"]
    }
}, { collection: 'students' });

module.exports = mongoose.model('Student', studentSchema);