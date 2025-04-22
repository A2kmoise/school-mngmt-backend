import express from 'express';
import multer from 'multer';
import path from 'path';


const router = express.Router()


router.put('teacher/id',  async(req , res) => {
    try {
       const teacherId = req.params.id 
       const updateTeacher = req.body

     const teacher = await Teacher.findByIdAndUpdate(teacherId, updateTeacher, {
        new:true,
        runValidator: true,

     })

     if(!teacher){
        return res.status(404).send('teacher not found')
     }
     return res.status(200).send('updated successfully')
    } catch (error) {
      return res.status(500).send('Server erro!')  
    }

})

export default router