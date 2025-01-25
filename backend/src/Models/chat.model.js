import mongoose, { model, Schema } from 'mongoose';

const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        isGroupChat: {
            type: String,
            required: true,
        },
        lastmessage: {
            type: String,
            required: true,
        },
        participants: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },

    { timestamps: true },
);
export const Chat = model('chat', chatSchema);
