import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../Models/usermodel.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Chat } from '../Models/chat.model.js';
import mongoose, { Schema } from 'mongoose';
import {emitSocketEvent} from "../scoket/index.js"
/**
 * The function `commonChatAggerigation` performs aggregation operations using MongoDB's ``,
 * ``, and `` stages to retrieve data from related collections.
 * @returns The `commonChatAggerigation` function returns an array of MongoDB aggregation pipeline
 * stages. The stages include `` stages to perform a left outer join with the 'users' and
 * 'messages' collections, `` stages to exclude certain fields from the output, ``
 * stages to add new fields to the documents, and `` operator to select the first element from an
 * array
 */
const commonChatAggerigation = () => {
    return [
        {
            $lookup: {
                from: 'users',
                foreignField: '_id',
                localField: 'participants',
                as: 'participants',
                pipeline: [
                    {
                        $project: {
                            password: 0,
                            refreshToken: 0,
                        },
                    },
                ],
            },
        },
        {
            $lookup: {
                from: 'messages',
                foreignField: '_id',
                localField: 'lastmessage',
                as: 'lastmessage',
                pipeline: [
                    {
                        $lookup: {
                            from: 'users',
                            foreignField: '_id',
                            localField: 'sender',
                            as: 'sender',
                            pipeline: [
                                {
                                    $project: {
                                        name: 1,
                                        username: 1,
                                        profilePic: 1,
                                        email: 1,
                                        phoneNo: 1,
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
                ],
            },
        },
        {
            $addFields: {
                lastMessage: { $first: '$lastmessage' },
            },
        },
    ];
};

/* The `availablechats` function is an asynchronous handler that retrieves a list of available chats
for a user. Here's a breakdown of what it does: */
const availablechats = asyncHandler(async (req, res) => {
    const chats = await User.find({ _id: { $ne: req.user._id } }).select(
        '-password -refreshToken -updatedAt -createdAt -profilePic._id -profilePic.public_id -email -statuses ',
    );
    if (chats.length === 0) {
        throw new apiError(400, 'No available chats');
    }
    return res.status(200).json(new apiResponse(200, chats, 'avalible chats find'));
});

const createOrGetOneOnOneChat = asyncHandler(async (req, res) => {
    const { reciverId } = req.params;
    if (!reciverId) {
        throw new apiError(400, 'reciver id is required');
    }
    const reciver = await User.findById(reciverId);
    if (!reciver) {
        throw new apiError(400, 'receiver is not exist');
    }

    if (reciver._id.toString() === req.user._id) {
        throw new apiError(400, "you can't chat with you self");
    }

   const chat= await Chat.aggregate([
    {
        $match:{
            isGroupChat:false,
            and:[
                {
                    participants:{$elemMatch:{$eq:req.user._id}}
            },
            {
                participants:{$elemMatch:{$eq:new mongoose.Types.ObjectId(reciverId)}} 
            }
        ]
        }
    },
    ...commonChatAggerigation()
   ])

   if(Chat.length){
    return res.status(200).json(new  apiResponse(200,chat[0],"chat retieve succesfully"))
   }
   const createnewchat=Chat.create({
    name:"One On One Chat",
    participants:[req.user._id,new mongoose.Types.ObjectId(reciverId)],
    admin:req.user._id
   })
   const createdChat=Chat.aggregate([
    {
        $match:{
            _id:createnewchat._id
        }
    },
    ...commonChatAggerigation
   ])
   const payload =createdChat[0]

   if(!payload){
    throw new apiError(500,"some thing went wrong ")

   }
   payload?.participants?.forEach(participant => {
    if(participant._id.toString()===req.user._id.toString()) return

    emitSocketEvent(req,
        participant._id?.toString(),
        ChatEventEnum.NEW_CHAT_EVENT,
        payload)
    
   });
});
export { availablechats ,createOrGetOneOnOneChat};
