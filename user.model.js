const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    expireAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: 900 } 
    }
});

userSchema.pre("save",async function(next){
    let salt=await bcrypt.genSalt();
    let hash=await bcrypt.hash(this.password,salt);
    this.password=hash;
    next();
})

userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}


const userModel=mongoose.model("User",userSchema)

module.exports=userModel;