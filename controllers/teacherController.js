import teacher_modules from '../models/teacher_modules'
import student_modules from '../models/student_modules'
import joi from 'joi'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
//userroles missing
//Teachers missing

const teacherSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive'),
  role: Joi.string().required()
});

exports.register = async (req, res) => {
  try {
    const { error } = teacherSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const role = await UserRole.findById(req.body.role);
    if (!role) return res.status(400).json({ message: 'Invalid role' });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const teacherData = {
      ...req.body,
      password: hashedPassword
    }

    const teacher = new Teacher(req.body);
    await teacher.save();

    const token = jwt.sign({ id: teacher._id }, config.get('jwtSecret'), { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    debug(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const teacher = await Teacher.findOne({ username }).populate('role');

    if (!teacher || !await bcrypt.compare(password, teacher.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: teacher._id }, config.get('jwtSecret'), { expiresIn: '1h' });
    res.json({ token, role: teacher.role.name });
  } catch (error) {
    debug(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('role', 'name description');
    res.json(teachers);
  } catch (error) {
    debug(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json({ message: 'Teacher deleted' });
    console.log("tr is deletable")
  } catch (error) {
    debug(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 