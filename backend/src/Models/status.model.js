import { model, Schema } from "mongoose";

const statusSchema=new Schema({
    content:{type:String,required:["status is required",true]},
    text:{type:String,lowercase:true,trim:true}

},{
timestamps:true

})
export const Status=model("status",statusSchema)