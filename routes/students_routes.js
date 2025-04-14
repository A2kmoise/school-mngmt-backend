import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router();

router.get('/students',(req,res) =>{
res.status(200).send("Hello, students ....")   

})


export default router