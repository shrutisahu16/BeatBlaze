const nodemailer=require('nodemailer');
require('dotenv').config('../')
var transport=nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.Password
    }
})



async function sendEmail(userEmail,verificationLink){
    var cont=`
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
    
            .container {
                background-color: #ffffff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
    
            h1 {
                color: #007bff;
                margin-bottom: 20px;
            }
    
            p {
                color: #555555;
                margin-bottom: 30px;
            }
    
            .verification-button {
                display: inline-block;
                background-color: #007bff;
                color: #000000;
                padding: 15px 30px;
                font-size: 16px;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s ease;
            }
    
            .verification-button:hover {
                background-color: #0056b3;
                color:#ffffff;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Email Verification</h1>
            <p>Thank you for signing up. To complete your registration, please click the button below to verify your email address.Link is valid only for 15 minutes.</p>
            <a href=${verificationLink} class="verification-button">Verify Email</a>
            <p>If you did not register on our website, please disregard this message.</p>
        </div>
    </body>
    
    </html>
    
    `

    var mailoption={
        from:'noreply@gmail.com',
        to:userEmail,
        subject:'Verification Link from BeatBlaze',
        text:`Verfication Link from BeatBlaze`,
        html:cont,   
    }
    try {
        await transport.sendMail(mailoption)
        return true;
    } catch (error) {
        console.log('error at mailer.js'+error.message)
        console.log(error)
        return false;
    } 
}

module.exports=sendEmail