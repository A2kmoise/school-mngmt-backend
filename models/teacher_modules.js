import { required } from "joi";
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required: true},
    firstname: {type: String, required:true},
    secondname: {type: String, required: true},
    course: {type:String, required: true},
    image: {type: String, required: true}
})


const Teacher = mongoose.model('Teacher', teacherSchema)

export default teacherSchema
