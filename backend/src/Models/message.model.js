import { model, Schema } from 'mongoose';

/* This code snippet is defining a Mongoose schema for a message in a messaging application. Let's
break it down: */
const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        content: {
            type: String,
        },
        attachment: {
            type: [
                {
                    url: String,
                    public_id: String,
                },
            ],
            default: [],
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: 'Chat',
        },
    },
    {
        timestamps: true,
    },
);
export const Message = model('Message', messageSchema);
