const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
username:String,
email:String,
pass:String
},{
    versionKey:false
})

const UserModel=mongoose.model("user",UserSchema);

module.exports={
    UserModel
}