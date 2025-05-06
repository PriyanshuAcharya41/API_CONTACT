
import mongoose from 'mongoose';
import express, { urlencoded } from 'express'
import bodyParser from 'express'
import userRouter from './Routes/User.js'
import contactRouter from './Routes/Contact.js'
import {config} from 'dotenv'
import cors from 'cors'
const app=express();

//to parse the json data from the req.body
app.use(bodyParser.json())

config({path:'.env'})

//cors
app.use(cors({
    origin:true,
    methods:['Post','Get','Put','Delete'],
    credentials:true
}))

mongoose.connect(process.env.MongoUrl).then(()=>{
    console.log("Mongo db connected");
}).catch((error)=>{console.log(error)});

// const contacts=[
//     {id:1,name:"Priyanshu",phone: '11111111111'},
//     {id:2,name:"Ishant",phone: '11111111111'},

//     {id:1,name:"Rohan",phone: '3333333333333'},
//     {id:1,name:"Mainu",phone: '4444444444444'},
//     {id:1,name:"Princua",phone: '5555555555555'}
// ]

app.use('/api/contact',contactRouter);
//for every contact present
// app.get('/api/contact',getAllContacts)

//for specific contact
// app.get('/api/contact',specificContact)

//add the data into the api, creating post method api endpoint without form, we can get it through postman or thunderclient
// app.post('/api/contact',addContacts)

//update the data using put
// app.put('/api/contact',updateContact)


//Delete contact
// app.delete('/api/contact', deleteContact)


app.use('/api/user',userRouter); //It will be used as a middleware and directly it will go to the user.js of routes folder.

//User register
// app.post('/api/user',userRegister)

//User registeration with bcrypt password
// app.post('/api/user',userRegisterBcrypt)

//User Login
// app.post('/api/user',userLoging)

//User Login via Decrypt password
// app.post('/api/user',userLoginBcrypt)


const port=3000;
app.listen(port,()=>{
    console.log("Sever is running");
})