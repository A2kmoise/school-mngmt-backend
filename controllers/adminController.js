import express from 'express'
import bcrypt from 'bcrypt'
import joi, { required } from 'joi'
import jwt from 'jsonwebtoken'
import config from 'config'

const adminSchema = joi.object({
    firstname : Joi.string().required(),
    secondname : Joi.string().required(),
    username : Joi.string().required(),
    password : Joi.string(8).required()
})

exports.register = async ( req , res) => {
    try {
        const { error } = adminSchema.validate(req.body);
        if ( error ) return res.status(400).json({message: error.details[0].message});

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    
        const adminData = {
          ...req.body,
          password: hashedPassword
        }
    

        const admin = new Admin(req.body);
        await admin.save();

        const token = jwt.sign({id: admin._id }, config.get('jwtSecret'), {expiresIn: '3h'})
        res.status(201).json({token})
    } catch (error) {
        debug (error)
        res.status(500).json({message: 'Server error'})
    }
}

exports.deleteAdmin = async (req,res) => {
    try {
        const admin = await Admin.findOneandDelete(req.param.Admin)
        if(!admin) return res.status(404).json({message: 'Admin not found'})
        res.json({message: 'Admin deleted'})
    } catch (error) {
        debug(error)
        res.status(500).json({message: 'Server error'})
        
    }
}