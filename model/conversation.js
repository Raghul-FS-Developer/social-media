const mongoose  = require("mongoose");
const {Schema} = mongoose;


const conversation = new Schema({
   
    members:{
      type:Array,  
    }

},{timestamps:true})

module.exports = mongoose.model("conversation",conversation)