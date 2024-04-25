const mongoose =require('mongoose');
const pool=mongoose.connect(process.env.MONGO_URL,{
    connectTimeoutMS: 10000
})
.then(function(db){
  console.log("db is connected 🎉🎉🎉");
})
.catch(function(err){
  console.log('error at mongo connection',err.message);
})


module.exports=pool;

