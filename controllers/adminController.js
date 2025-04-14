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
    
}