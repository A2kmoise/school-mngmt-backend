import { required } from 'joi';
import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: {type: String, required: true },
    firstname: {type: String, required: true},
    Secondname: { type: String, required: true },
    age: { type: Number, required: true},
    grade: { type: String, required: true},
    image: { type: String, rquired: true }

});

const Student = mongoose.model('student', studentSchema);

export default studentSchemas