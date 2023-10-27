const mongoose=require("mongoose");
require("dotenv").config();
const connect=mongoose.connect("mongodb+srv://jai:jai@cluster0.2hpd1gu.mongodb.net/NoteTakingApp?retryWrites=true&w=majority")

module.exports={
    connect
}