import { model, Schema } from 'mongoose';

const statusSchema = new Schema(
    {
        content:{
            url:{
                type:String, 
                required:[true,'status is required']
       
            },
            public_id:{
                type: String,
            },
        },
        text: { type: String, lowercase: true, trim: true },
    },
    {
        timestamps: true,
    },
);
export const Status = model('status', statusSchema);
