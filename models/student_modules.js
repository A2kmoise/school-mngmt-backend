const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true},
    grade: { type: String, required: true},
    image: { type: String, rquired: true }

});

const Student = mongoose.model('student', studentSchema);

module.exports = Student;