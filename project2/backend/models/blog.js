const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"this name feild is required"]
    },
    article:{
        type:String,
        required:[true,"this email feild is required"],
        
    },
    bannerImage:{
        type:String,
        required:[true,"this password feild is required"]
    },
    date:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:String
    }
})
const blogmodel=new mongoose.model("blogs of blog app ",schema)
module.exports=blogmodel;