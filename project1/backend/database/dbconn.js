const mongoose=require("mongoose")
const clc=require("cli-color")
const dotenv=require("dotenv")
dotenv.config()
const USERNAME_DATABASE=process.env.USERNAME_DATABASE
const PASSWORD_DATABASE=process.env.PASSWORD_DATABASE
const uri = `mongodb+srv://${USERNAME_DATABASE}:${PASSWORD_DATABASE}@atlascluster.gw1or1c.mongodb.net/login-signup-bharat-intern?retryWrites=true&w=majority`;

const db=async()=>{
    try{
        await mongoose.connect(uri)
        console.log(clc.bgCyan.green("database connection succesful bro"))
    }catch(err){
        console.log(err)
    }
}
module.exports=db;