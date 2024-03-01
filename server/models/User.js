const {Schema,model} = require('mongoose')
const UserSchema = new Schema({
    user_name:{
        type:String,
        required:true,
        minlength:4
    },
    email:{
        type:String,
        minlength:8,
        required:true,
        unique:true
    },
    password:{
        type:String,
        reqquired:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    image:{
        type:String,
        default:''
    }
},{
    timestamps:true,
    versionKey:false
})
 

module.exports = model('user',UserSchema)