const mongoose=require("mongoose");

const NoteSchema=mongoose.Schema({
title:String,
body:String,
userid:String
},{
    versionKey:false
})

const NoteModel=mongoose.model("note",NoteSchema);

module.exports={
    NoteModel
}