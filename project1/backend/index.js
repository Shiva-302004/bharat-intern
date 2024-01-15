const express=require("express")
const app=express();
const dotenv=require("dotenv")
dotenv.config()
const db=require("./database/dbconn")
const router=require("./routes/routes")
const clc=require("cli-color")
const cors=require("cors")
const PORT=process.env.PORT_FOR_RUNNING
const path=require("path")
// app.use(body_Parser({extended:true}))
app.use(express.json())
app.use(cors()) 
app.use(router)
app.use(express.static(path.join(__dirname,"../frontend")))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/index.html"))
})
app.get('/loginuser',(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/login.html"))
})
app.get('/signinuser',(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/register.html"))
})
db().then(
    app.listen(PORT,()=>{
        console.log(clc.bgBlue.red("server connected successfully"))
        // console.log(path.join(__dirname,"../frontend"))
    })
).catch((err)=>{
    console.log(clc.bgRed.white("this is a error"))
})