const express=require('express');
const router=express.Router();

router
.route('/main')
.get((req,res)=>{
    return res.render('main')
})


module.exports=router;