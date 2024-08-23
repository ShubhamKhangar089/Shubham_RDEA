import { UserModel } from "../models/UserModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()


export const getAllUsers = async(req,res)=>{
    try {
        const users = await UserModel.find();
        res.status(200).json({users : users})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


export const userRegister = async(req,res)=>{
    const {username , email, password,role} = req.body;
    try {
        if(!username || !email || !password){
            return res.status(404).json('All Field Are Required!!')
        }

        //check already present or not
        const existUser = await UserModel.findOne({email});
        if(existUser){
            return res.status(409).json('An account with this email already exists. Please try to login.');
        }

        //take password and hash it
        let saltRounds = 10 ;
        let hashPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new UserModel({ username , email , password : hashPassword, role })
        await newUser.save();
        res.status(201).json({message : "User Register Successfully", user : newUser});
        
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const userLogin = async(req,res)=>{
    const {email, password} = req.body;
     try {
    if(!email || !password){
        return res.status(404).json('All Field Are Required!!')
    }

    const existUser = await UserModel.findOne({email})
    if(!existUser){
        return res.status(404).json('Email Is not Register! Please try to Register ')
    }

    // Load hash from your password DB.
    const isMatch = bcrypt.compareSync(password, existUser.password);
    if(!isMatch){
        return res.status(409).json('Incorrect Password!!')
    }
    //pass id role and needed info to check auth
    const payload = {email : existUser.email , _id : existUser._id, role : existUser.role};
    const secret_key = process.env.SEC_KEY ;
    //jwt sign create token
    jwt.sign(payload , secret_key , {expiresIn : '1d'}, (err,token)=>{
        if(err){
            console.log("jwt.sign Error :", err.message);
        }
        res.status(200).json({user : existUser, token : token })
    });
     } catch (error) {
        res.status(500).json({message : error.message})
     }
}