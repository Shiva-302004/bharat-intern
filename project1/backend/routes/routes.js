const express=require("express")
const router=express.Router()
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const path=require("path")
const secret_key=process.env.SECRET_KEY
const usermodel=require("../models/usersignup")
// console.log(path.join(__dirname,"frontend"))
// router.use(express.static(path.join(__dirname,"frontend")))
router.post("/signin",async (req,res)=>{
    // console.log(name)
    const name=req.body.name
    const password=req.body.password
    
    const email=req.body.email
    try{
        const data=await usermodel.findOne({email})
        if(data){
            res.status(201).json({
                msg:"user already exist",
                desc:"please try with different user"
            })
        }else{
            const hashpassword=await bcryptjs.hash(password,10)
            
            const user=new usermodel({name,email,password:hashpassword})
            const newuser=await user.save()
            const payload={
                user:{
                    id:newuser._id
                }
            }
            const token=jwt.sign(payload,secret_key)
            res.status(201).json({
                data:newuser,
                token:token,
                success:true
            })
        }
    }catch(err){
        res.status(400).json({msg:"there is a error while signin ",msgg:err})
    }
})
router.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const data=await usermodel.findOne({email})
    try{
        if(!data){
            res.status(201).json({
                msg:"user not exist ",
                desc:"please signup to use this login"
            })
        }else{
            const isMatch=await bcryptjs.compare(password,data.password)
            if(!isMatch){
                res.status(201).json({msg:"invalid credentials",desc:"invalid password"})
            }else{
                const payload={
                    user:{
                        id:data._id
                    }
                }
                const token=jwt.sign(payload,secret_key)
                res.status(201).send({data:data,token:token,success:true})
            }
        }
    }catch(err){
        res.status(401).json({msg:"err while login",desc:err})
    }
})
module.exports=router