const express=require("express");
const { connect } = require("./db");
const { UserRouter } = require("./routes/user.router");
const { NoteRouter } = require("./routes/note.routes");
require("dotenv").config();
const app=express();

app.use(express.json());

app.use("/users",UserRouter);
app.use("/notes",NoteRouter);

app.get("/",(req,res)=>{
    res.send("BACKEND IS WORKING!")
})



app.listen(process.env.PORT,async()=>{
    try {
        await connect
        console.log("Connected with DB Atlas")
        console.log("Server is running on port 4000");
    } catch (error) {
        console.log(error)
    }
})