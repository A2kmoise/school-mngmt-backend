import student_modules from '../models/student_modules'
import teacher_modules from '../models/teacher_modules'
import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
import Joi from 'joi'

const studentSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.stirng().required(),
    password: Joi.string().min(8).required(),
    firstname: Joi.string().required(),
    secondname: Joi.string().required()
})

exports.register = async(req,res) =>{
    try {
       const { error } = studentSchema.validate(req.body);
       if(error) return res.status(400).json( {message: error.details[0].message}) 

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    
        const studentData = {
          ...req.body,
          password: hashedPassword
        }
    
        
      const student = new Student(req.body)
      await student.save()
    
      const token = jwt.sign({ id: scontstudent._id}, config.get('jwtSecret'), { expiresIn: '2h'})
      res.status(201).json({token})

    } catch (error) {
     debug(error)
     res.status(500).json({ message: 'server error'})   
    }
}

exports.login = async (req , res) => {
try {
   const { username, password } = req.body
   const student = await Student.findOne({ username})
   
   if(!student|| !await bcrypt.compare(password, student.password)) {
   return  res.status(401).json({ message: 'Invalid user'})
   }
   const token = jwt.sign({id: student._id}, config.get('jwtSecret'), { expiresIn: '2h'})
   res.json({token})
} catch (error) {
  debug(error)
  res.send(500).json({ message: 'Server error'})  
}
}

exports.getStudents = async (req ,res) => {
    try {
       const teacher = await Teacher.find()
       res.json(students) 
    } catch (error) {
        debug(error)
        res.status(500).json({ message: 'Server error'})
    }
}

exports.deleteStudent = async (req , res) => {
    try{
    const student = await Student.findByIdAndDelete(req.params.id);
    if(!student) return res.status(404).json({ message: 'Student not found'})
    res.json({ message: 'Student deleted successfully'}) 
}catch(error){
    debug(error)
    res.status(500).json({ message: 'Server error'});
}
}   

