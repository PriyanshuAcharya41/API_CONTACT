import express from 'express'
import { User } from '../Models/User.js'
import { userRegister,userLoginBcrypt,userLoging,userRegisterBcrypt } from '../Controllers/User.js';
const router=express.Router();

router.post('/register',userRegister);  // '/api/user/register

router.post('/login',userLoging);  ///api/user/login

router.post('/registerPassword',userRegisterBcrypt);  // /api/user/registerPassword

router.post('/loginBcrypt',userLoginBcrypt)    // /api/user/loginBycrypt
export default router