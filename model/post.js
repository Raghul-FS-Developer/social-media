const mongoose  = require("mongoose");
const {Schema} = mongoose;


const post = new Schema({
   userId:{
       type:String,
       required:true
   },
   disc:{
       type:String,
       max:500    
   },
   Image:{
       type:String 
   },
   likes:{
       type:Array,
       default:[]
   }
},{timestamps:true})

module.exports = mongoose.model("post",post)