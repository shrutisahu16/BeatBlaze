const User=require('../model/user.model')
const createError=require('http-errors')
const {isEmailValid}=require('../utils/validator')
const {generateVerificationToken,generateLoginToken,verifyToken}=require('../utils/jwtService')
const sendEmail=require('../utils/emailservice')
const registerController = async (req, res, next) => {
    try {
        const {name,email,password}=req.body;
        if(!name||!email||!password) throw createError.BadRequest("All fields required");
        if(!isEmailValid(email)) throw createError.BadRequest("Enter a valid e-mail")
        if(password.length<4) throw createError.BadRequest("Password should have atleast 4 characters")
        const doesexist=await User.findOne({email});
        if(doesexist) throw createError.Forbidden("User already exist with this email");
        const token = await generateVerificationToken({ email })
        const verificationLink = `${process.env.FRONT_END_URL}/verification/${token}`
        const isEmailsent=await sendEmail(email,verificationLink)
        if(!isEmailsent) throw createError.InternalServerError("Email service is not working");
        const user=await User.create({
            email,password,name
        });
        return res.status(200).json({
            message:`Verification link has been sent on ${email}.Please verify it`,
            success:true
        })
    } catch (error) {
        next(error);
    }
}
const loginController=async(req,res,next)=>{
    try {
        const {email,password}=req.body;
        if(!email||!password) throw createError.BadRequest("All fields required");
        if(!isEmailValid(email)) throw createError.BadRequest("Enter a valid email");
        const doesexist=await User.findOne({email});
        if(!doesexist) throw createError.Forbidden("User with this email donot exist");
        if(!doesexist.isVerified) throw createError.Forbidden(`Please check your ${email} and verify the link`);
        const ismatch=await doesexist.comparePassword(password);
        if(!ismatch) throw createError.Forbidden("Email/Password is not correct");
        const token=await generateLoginToken({email,_id:doesexist._id});
        const user={
            email:doesexist.email,
            name:doesexist.name
        }
        return res.status(200).json({
            message:"Successfully logined",
            token,
            user,
            success:true
            
        })
    } catch (error) {
        next(error);
    }
}

const userVerification =async(req,res,next)=>{
    try {
        const token=req.params.token;
        console.log(token);
        const response=await verifyToken(token);
        if(!response.flag) throw createError.BadRequest("Invalid token or token expired")
        const {email}=response.message;
        const newExpires=new Date('9999-12-31T23:59:59.999Z');
        await User.findOneAndUpdate({email},{isVerified:true,expireAt:newExpires});
        return res.status(200).json({
            message:"Verified successfully",
            success:true
        })
    } catch (error) {
        next(error);
    }
}
module.exports={
    registerController,
    loginController,
    userVerification
}