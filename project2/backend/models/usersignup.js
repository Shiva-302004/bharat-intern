const mongoose=require("mongoose")
const validator=require("validator")
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"this name feild is required"]
    },
    email:{
        type:String,
        required:[true,"this email feild is required"],
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("this is not a valid email")
            }
        }
    },
    password:{
        type:String,
        required:[true,"this password feild is required"]
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const usermodel=new mongoose.model("users of blog-app ",schema)
module.exports=usermodel;