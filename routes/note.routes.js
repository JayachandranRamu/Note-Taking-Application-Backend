const express=require("express");
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth.middleware");
const { NoteModel } = require("../model/note.model");
const { UserModel } = require("../model/user.model");

const NoteRouter=express.Router();

NoteRouter.use(auth)

NoteRouter.get("/",async(req,res)=>{
try {
    const notes=await NoteModel.find({userid:req.body.userid});
    res.status(200).send(notes)
} catch (error) {
    res.status(400).send({error})
}
})

NoteRouter.post("/create",async(req,res)=>{
try {
    const note=new NoteModel(req.body);
    await note.save();
    res.status(200).send({message:"Note Created!"});
} catch (error) {
    res.status(400).send({error})
}
})

NoteRouter.patch("/update/:id",async(req,res)=>{
    const {id}=req.params;
 try {
    const book = await NoteModel.findOne({ "_id": id });
    if (req.body.userid === book.userid) {
        await NoteModel.findByIdAndUpdate({ "_id": id }, req.body);
        res.status(200).send({message:"Note Updated!"});
    } 
    else {
        res.status(401).send({ "msg": "Not Authorized" });
    }
} 
catch (error) {
    res.status(400).send({error})
}
})



NoteRouter.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params;
    try {
        const book = await NoteModel.findOne({ "_id": id });
        if (req.body.userid === book.userid) {
            await NoteModel.findByIdAndDelete({ "_id": id });
            res.status(200).send({message:"Note Deleted!"});
        } 
        else {
            res.status(401).send({ "msg": "Not Authorized" });
        }
    } 
    catch (error) {
        res.status(400).send({error})
    }
})


module.exports={
    NoteRouter
}