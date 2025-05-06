import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export const userRegister=async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    if(user) return res.json({message:"You are alredy registered"})
    user=await User.create({name,email,password})
    
    res.json({message:"User register successfully",user});
}

export const userRegisterBcrypt=async(req,res)=>{
    const {name,email,password}=req.body;
    if(name==' ' || email==' '|| password==' '){
        return res.status(404).json({message:"All fields are required"});
    }
    let user=await User.findOne({email});
    if(user) return res.json({message:"You are alredy registered"})
        const hashPass=await bcrypt.hash(password,10);
    user=await User.create({name,email,
        password:hashPass})
    

    res.json({message:"User register successfully",user});
}

export const userLoging=async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    // if(!user) return res.render('/api/user/register');
    if(!user) return res.json({message:"User does notexist"});
    let pass=await User.findOne({password});

    if(!pass)
    {
        return res.json({message:"Wrong Password enter"})
    }
        else if(pass.password!=password){
            return res.json({message:"Wrong Password enter"})
    } 

    const token=jwt.sign({user},'12345',{expiresIn:'1d'})
        
        res.json({message:"Successfully login ",token});
}

export const userLoginBcrypt=async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    // if(!user) return res.render('/api/user/register');
    if(!user) return res.status(400).json({message:"User does notexist"});
    let pass=await User.findOne({password});
    const validPass=await bcrypt.compare(password,user.password);

    if(!validPass)
    {
        return res.status(400).json({message:"Wrong Password enter"})
    }
        const token=jwt.sign({user},process.env.JWT_secret,{expiresIn:'1d'})
        res.json({message:"Successfully login ",token});
}
