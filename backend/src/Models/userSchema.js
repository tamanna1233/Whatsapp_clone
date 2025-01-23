import {model ,Schema} from 'mongoose'
const userdata = new Schema ({
    name:{
        type:String,
        required:[true,"name is required"],
        lowercase:true,
        trim:true
    },
    phoneNo:{
        type:String,
        required:[true,"mobile number is required"],
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true,
        trim:true,
        lowercase:true,
    },
    username:{
        type:String,
        required:[true,'username is required'],
        unique:true,
        trim:true,
        lowercase:true
    },
     password:{
        type:String,
        required:[true,'password']
     }

},
{
    timestamps:true
}

)
export const user = model('user',userdata)