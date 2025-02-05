const express = require('express');
const multer = require('multer');
const path = require('path');
const Student = require('../models/Student_modules');

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


router.post('/', upload.single('image'), async (req, res) => {
    const { name, age, grade } = req.body;
    const image = req.file ? req.file.filename : null;

    const newStudent = new Student({ name, age, grade, image });
    await newStudent.save();
    res.status(201).json(newStudent);
});


router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});



router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { name, age, grade } = req.body;
    const image = req.file ? req.file.filename : null;

    const updatedStudent = await Student.findByIdAndUpdate(id, { name, age, grade, image }, { new: true });
    
    if (!updatedStudent) {
        return res.status(404).send('Student not found');
    }

    res.json(updatedStudent);
});



router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    
    if (!deletedStudent) {
        return res.status(404).send('Student not found');
    }

    res.status(204).send();
});

module.exports = router;
