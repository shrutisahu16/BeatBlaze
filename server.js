const express=require('express')
const bodyParser=require('body-parser')
const hbs=require('hbs')
const cookieParser = require('cookie-parser');
const path=require('path');
const userRouter = require('./route/user.route');
const mainRouter=require('./route/main.route')
require('dotenv').config();
require('./db/db')
const app=express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'./views')));
app.use(express.static(path.join(__dirname,'./views/css')));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.set('view engine','hbs');
const hbs_url=path.join(__dirname,'./views/templates')
const partial_url=path.join(__dirname,'./views/partials')
app.set('views',hbs_url)
hbs.registerPartials(partial_url)
app.use(userRouter)
app.use(mainRouter)


app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    console.log(err.message);
    return res.json({
        message:err.message,
        success:false
    })
})
app.listen(3000);

