import { Chat } from '../Models/chat.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { Message } from '../Models/message.model.js';
import mongoose from 'mongoose';
import { apiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudninary, uploadOnCloudinary } from '../utils/cloudnariy.js';
import { emitSocketEvent } from '../scoket/index.js';
import { chatEventEnum } from '../constant.js';
/**
 * The function `commonAggerigation` returns an array of MongoDB aggregation stages for performing a
 * lookup operation on a collection named "users".
 * @returns An array of aggregation stages is being returned. The aggregation stages include a
 * stage to perform a left outer join with the "users" collection, followed by a  stage to
 * add a new field "sender" by selecting the first element from the "sender" array.
 */
const commonAggerigation = () => {
    return [
        {
            $lookup: {
                from: 'users',
                foreignField: '_id',
                localField: 'sender',
                as: 'sender',
                pipeline: [
                    {
                        $project: {
                            usename: 1,
                            avatar: 1,
                            email: 1,
                            profilePic: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                sender: { $first: '$sender' },
            },
        },
    ];
};

const getallmessages = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const selectedChat = await Chat.findById(chatId);

    if (!selectedChat) {
        throw new apiError(400, "chat don't exist ");
    }
    if (!selectedChat.participants.includes(req.user._id)) {
        throw new apiError(400, 'user is not part of chat');
    }

    const message = await Message.aggregate([
        {
            $match: {
                chat: new mongoose.Types.ObjectId(chatId),
            },
        },

        ...commonAggerigation(),
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);
    if (!message) {
        throw new apiError(400, 'message not found');
    }

    return res.status(200).json(new apiResponse(200, message || [], 'message fetch sucessfully'));
});

/* The `sendmessage` function is an asynchronous handler that handles the logic for sending a message
in a chat application. Here is a breakdown of what the function does: */
const sendmessage = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;
    console.log(req?.files);

    if (!content && !req.files?.attachments?.length > 0) {
        throw new apiError(400, 'content and attachment  is required');
    }
    const selectedChat = await Chat.findById(chatId);
    if (!selectedChat) {
        throw new apiError(400, 'chat not exist');
    }
    const messagefile = [];
    if (req.files && req?.files?.attachments?.length > 0) {
        for (const attachment of req.files.attachments) {
            try {
                const url = await uploadOnCloudinary(attachment.path);
                if (url?.secure_url) {
                    messagefile.push({ url: url.secure_url, public_id: url.public_id });
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }
    const message = await Message.create({
        sender: new mongoose.Types.ObjectId(req.user._id),
        content: content || '',
        attachment: messagefile,
        chat: new mongoose.Types.ObjectId(chatId),
    });

    const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $set: {
                lastmessage: message._id,
            },
        },
        { new: true },
    );

    const messages = await Message.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(message._id) },
        },
        ...commonAggerigation(),
    ]);
    const recivedmessage = messages[0];
    if (!recivedmessage) {
        throw new apiError(500, 'internal sever error');
    }

    chat.participants.forEach((participants) => {
        if (participants._id.toString() === req.user._id.toString()) return;
        emitSocketEvent(
            req,
            participants.toString(),
            chatEventEnum.MESSAGE_RECEIVED_EVENT,
            recivedmessage,
        );
    });

    return res
        .status(200)
        .json(new apiResponse(200, recivedmessage, 'message recived sucessfully'));
});

const deleteMessage = asyncHandler(async (req, res) => {
    const { chatId, messageId } = req.body;
    console.log(chatId, messageId);

    const chat = await Chat.findOne({
        _id: new mongoose.Types.ObjectId(chatId),
        participants: new mongoose.Types.ObjectId(req.user._id),
    });
    if (!chat) {
        throw new apiError(400, 'chat does not  exit');
    }

    const message = await Message.findOne({
        _id: new mongoose.Types.ObjectId(messageId),
    });

    if (!message) {
        throw new apiError(400, 'message does not exist');
    }

    if (message?.sender?._id.toString() !== req?.user?._id.toString()) {
        throw new apiError(400, 'user not do not have authrozied to delete this messaage');
    }
    if (message.attachment.length > 0) {
        message.attachment.map((assest) => {
            deleteOnCloudninary(assest.public_id);
        });
    }

    await Message.deleteOne({
        _id: new mongoose.Types.ObjectId(messageId),
    });

    if (chat.lastmessage && chat.lastmessage.toString() === message._id.toString()) {
        const lastMessage = await Message.findOne(
            { chat: chatId },
            {},
            { sort: { createdAt: -1 } },
        );
        console.log(lastMessage);

        await Chat.findByIdAndUpdate(chatId, {
            lastmessage: lastMessage ? lastMessage._id : null,
        });
    }

    chat.participants.forEach((participant) => {
        console.log(participant);
        if (participant.toString() === req.user._id.toString()) return;
        emitSocketEvent(
            req,
            participant._id.toString(),
            chatEventEnum.MESSAGE_DELETE_EVENT,
            message,
        );
    });

    res.status(200).json(new apiResponse(200, {}, 'message delete sucessfully'));
});

export { getallmessages, sendmessage, deleteMessage };
