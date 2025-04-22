import express from 'express';
import multer from 'multer';
import path from 'path';
import  studentSchemas from './models/student_modules';

const router = express.Router();


router.put('/students/:id', async (req, res) => {
    try {
        const studentId = req.params.id 
        const updatedStudent = req.body;
        
    
        const student = await  studentSchemas.findByIdAndUpdate(studentId, updatedStudent, {
            new: true, 
            runValidators: true, 
        });

        if (!student) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send(student); 
    } catch (err) {
        res.status(500).send("Error updating student: " + err.message);
    }
});

export default router;
