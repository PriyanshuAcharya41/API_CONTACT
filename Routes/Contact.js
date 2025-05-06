import express from 'express'
import { Contact } from '../Models/Contact.js';
import { getAllContacts, specificContact,deleteContact,addContacts,updateContact, getContactByUserId } from '../Controllers/Contact.js';
import { Authenticate } from '../Middleware/Auth.js';
const router=express.Router();

router.get('/:id',Authenticate,specificContact);  // /api/contact/:id

router.post('/add',Authenticate,addContacts);     // /api/contact/add

router.put('/:id',Authenticate,updateContact);    // /api/contact/:id

router.delete('/:id',Authenticate,deleteContact)   // /api/contact/:id


//contact by user id
router.get("/userid/:id",getContactByUserId)
export default router; 