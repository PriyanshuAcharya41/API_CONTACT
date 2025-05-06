import { Contact } from "../Models/Contact.js";
export const getAllContacts=async(req,res)=>{
    const contacts=await Contact.find();
    if(!contacts){
        return res.json({message:"No contact found"});
    }

    res.json({message:"COntact fetched",contacts});
}

export const specificContact=async (req,res)=>{
    const id=req.params.id;
    console.log(id);
    const userContact=await Contact.findById(id);
    if(!userContact) res.json({message:"No one is there with this id"});
    else{
        res.json(userContact);
    }   
}

export const addContacts=async (req,res)=>{
    const {name,email,phone,type}=req.body;
    const saveContact=await Contact.create({
        name,email,phone,type,
        user:req.user
    })
    
    res.json({message:"Contacts saved successfully",saveContact});  
}

export const updateContact=async (req,res)=>{
    const id=req.params.id;
    const {name,email,phone,type}=req.body
    const updateContact=await Contact.findByIdAndUpdate(id,{name,email,phone,type},{new:true});
    if(!updateContact) return res.json({message:"Contact not updated"});
    res.json({message:"contact updated successfully ",updateContact});
}

export const deleteContact=async(req,res)=>{
    const id=req.params.id;
    const deleteContact=await Contact.findByIdAndDelete(id);
    if(!deleteContact) return res.json({message:"No such contact found"});
    res.json({message:"Contact deleted successfully",deleteContact})
}

export const getContactByUserId=async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    let contact=await Contact.find({user:id})
    
    if(!contact) return res.json({message:"Contact Not Found"});
    console.log(contact);
    res.json({message:"User specific Contact",contact})
}

