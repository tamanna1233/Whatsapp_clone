import { model, Schema } from 'mongoose';

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },

        content: {
            type: String,
            required: true,
        },
        attachment: {
            type: {
                fileurl: String,
            },
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
