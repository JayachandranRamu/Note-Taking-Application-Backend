const express=require("express");
const bcrypt=require("bcrypt");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const UserRouter=express.Router();

UserRouter.post("/register",async(req,res)=>{
    const {username,email,pass}=req.body;
    try {
        const check=await UserModel.findOne({email});
    if(check){
        res.status(200).send({"msg":"User is already exist."})
    }else{
        bcrypt.hash(pass,2,async(err,hash)=>{
            if(err){
                res.status(200).send({msg:"err"})
            }else{
const user=new UserModel({username,email,pass:hash});
await user.save();
res.status(200).send({msg:"User Successfully Registered!"})
            }
        });}
    } catch (error) {
        res.status(400).send({msg:"error"})
    }
})



UserRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.findOne({email});
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(err){
                res.status(200).send({msg:`Wrong Credential`})
            }else{
                const token=jwt.sign({id:user._id},"masai");
                res.status(200).send({msg:`Welcome ${user.username}, You Have Logined In Successfully!`,token})
            }
        })
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports={
    UserRouter
}