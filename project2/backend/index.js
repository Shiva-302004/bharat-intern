const express = require("express")
const app = express()
const path = require("path")
const cors = require("cors")
const clc = require("cli-color")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT_FOR_RUNNING
const db = require("./database/dbconn")
const fileupload = require("express-fileupload")
const router = require("./routes/routes")
const blogmodel = require("./models/blog")
// const multer=require("multer")
// const photo=require("express-fileupload")
app.use(express.static(path.join(__dirname, "../frontend")))
app.use(fileupload())
app.use(cors())
app.use(express.json())
app.use(router)
// app.use("/images",express.static("uploads/images"))
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"))
})
app.get("/editor", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/editor.html"))
})
app.post("/upload", (req, res) => {
    let file = req.files.image;
    let date = new Date();
    let imagename = date.getDate() + date.getTime() + file.name
    let rpath = path.join(__dirname, "../frontend/uploads/") + imagename
    file.mv(rpath, (err, result) => {
        if (err) {
            throw Error
        } else {
            res.json(`uploads/${imagename}`)
        }
    })
})
app.get('/loginuser', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"))
})
app.get('/signinuser', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"))
})
app.get("/:blog",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/blog.html"))
})

app.get("/blog/:id", async (req, res) => {
    const id = req.params.id
    const data = await blogmodel.findOne({ _id:id })
    if (!data) {
        res.status(200).json({sucess:false,data:data})
    } else {
        res.json({
            success: true,
            data: data,
            
        })
        // res.sendFile(path.join(__dirname, "../frontend/blog.html"))
    }
})
app.get("/blogs/allblogs",async(req,res)=>{
    const data=await blogmodel.find()
    res.json(data)
    console.log(data)
})
app.get("*", (req, res) => {
    res.json({ "msg": "page nount found" })
})
console.log(path.join(__dirname, "../frontend/uploads"))
db().then(
    app.listen(PORT, () => {
        console.log(clc.bgBlue.red("server connected successfully"))
        // console.log(path.join(__dirname,"../frontend"))
    })
).catch((err) => {
    console.log(clc.bgRed.white("this is a error", err))
})