import jwt, { decode } from 'jsonwebtoken'
import { User } from '../Models/User.js';

export const Authenticate= async(req,res,next)=>{
    const token=req.header("Auth");
    // console.log(token);
    if(!token) return res.status(400).json({message:"User needs to login"})

        const decoded=jwt.verify(token,process.env.JWT_secret)
        
        const id=decoded.user._id;
        let user=await User.findById(id);
        if(!user) return res.json({message:"User not Find"});
        req.user=user; //Now I can use user anywhere
    next();
}