const mongoose  = require("mongoose");
const {Schema} = mongoose;


const user = new Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max :50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilepicture:{
        type:String,
        default:""
    },
    coverpicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    disc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:String
        // type:Number,
        // enum:[1,2,3]
    },

    ValidityStatus:{
        type:String,
        default:'inActive'   
    }
},{timestamps:true})

module.exports = mongoose.model("user",user)