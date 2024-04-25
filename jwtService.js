const jwt = require('jsonwebtoken')
const createError = require('http-errors')


module.exports = {

    generateLoginToken :  function(user){
        return  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    },
    generateVerificationToken:async function(user){
            const token=await jwt.sign(user,process.env.VERIFICATION_TOKEN_SECRET,{expiresIn:'15m'})
            const tokenParam = Buffer.from(token).toString('base64');
            return tokenParam
    },
    verifyToken:async function(token){
        try {
            const jwttoken = Buffer.from(token, 'base64').toString('utf-8');
            const result= jwt.verify(jwttoken,process.env.VERIFICATION_TOKEN_SECRET);
            return {
                message:result,
                flag:true
            }
        } catch (error) {
            return {
                message:error.message,
                flag:false
            }
        }
    },
    checkToken:function(token){
        try {
            const response=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
            return {
                message:response,
                flag:true
            }
        } catch (error) {
            return {
                message:error.message,
                flag:false
            }
        }
    }
}