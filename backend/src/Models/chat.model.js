import mongoose, { model, Schema } from 'mongoose';

/* This code snippet is defining a Mongoose schema for a chat entity. Here's a breakdown of what each
part of the schema represents: */
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
