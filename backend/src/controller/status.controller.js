import mongoose from "mongoose";
import { Chat } from "../Models/chat.model.js";
import { Status } from "../Models/status.model.js";
import { User } from "../Models/usermodel.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { deleteOnCloudninary, uploadOnCloudinary } from "../utils/cloudnariy.js";

const uploadStatus = asyncHandler(async(req,res)=>{
    const {text} = req.body;
    const content= req?.file?.path;
    if(!content ){
        return res.status(400).json({message:"Please provide a status"});
    }
   const response = await uploadOnCloudinary(content)
    if(!response){
     throw new apiError(400,"Failed to upload status");
    }
const status =  await Status.create({content: {url:response.url , public_id:response.public_id}, text})
await User.findByIdAndUpdate(req.user._id,{
    $push:{statuses:status._id}
})
 res .status(200) .json (new apiResponse(201,status,"Status uploaded successfully"));
})


// delete status

const deleteStatus = asyncHandler(async (req, res) => {
    const { _id } = req.user; 

    if (!_id) {
        return res.status(400).json({ message: 'User not found' });
    }
    console.log(_id)

    const {statusId} = req.body; 
    console.log(statusId)
    if (!statusId) {
        return res.status(400).json({ message: 'Status ID is required' });
    }

const content = await Status.findById(statusId)
if(!content){
    console.log("status id not found")
}
await deleteOnCloudninary(content.content.public_id)


    const status = await Status.findByIdAndDelete(statusId);
    if (!status) {
        return res.status(404).json({ message: 'Status not found' });
    }

    return res.status(200).json(new apiResponse(200, {},'Status deleted successfully'));
});


const getAllStatus=asyncHandler(async(req,res)=>{

  const id=req.user._id 
  if(!id){
    throw new apiError(400,"unathorised user")
  }
  const Status = await Chat.aggregate([
    { $match: { participants: new mongoose.Types.ObjectId(id) } },
    { $unwind: "$participants" },
    { $match: { participants: { $ne: new mongoose.Types.ObjectId(id) } } },
    { $group: { _id: "$participants" } },
    {
        $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userInfo"
        }
    },
    { $unwind: "$userInfo" },
    {
        $lookup: {
            from: "status",
            localField: "userInfo.statuses",
            foreignField: "_id",
            as: "status"
        }
    },
    {
        $match: {
            "status.content.url": { $exists: true, $ne: null }
        }
    },
    {
        $addFields: {
            latestStatus: {
                $arrayElemAt: [
                    { $sortArray: { input: "$status", sortBy: { createdAt: -1 } } }, // Sort by latest createdAt
                    0
                ]
            }
        }
    },
    {
        $project: {
            _id: 1,
            name: "$userInfo.name",
            profile: "$userInfo.profilePic.url",
            content: "$status.content.url", 
            statustime:{$map:{input:"$status",as:"s",in:{$dateToString:{format:"%H:%M",date:"$$s.createdAt",timezone:"Asia/Kolkata"}}}},
            text: "$status.text",
            latestTime: {
                $dateToString: {
                    format: "%H:%M ",  // 12-hour format with AM/PM
                    date: "$latestStatus.createdAt",
                    timezone: "Asia/Kolkata"
                }
            }
        }
    }
]);



if(!Status){
    throw new apiError(500,"status not found")
}
return res.status(200).json(new apiResponse(200,Status,"status is fetch succesfullly"))



})

const getmystatus=asyncHandler(async(req,res)=>{
    const id =req.user._id
    if(!id){
        throw new apiError(400,"user id is required")
    }
    const status=await User.aggregate([
      {$match:{_id:id}},
      {
        $lookup:{
          from:"status",
          localField:"statuses",
          foreignField:"_id",
          as:"status"
        }
      },
      {$unwind:"$status"},
      {
        $project:{
          url:"$status.content.url",
          text:"$status.text",
          statusId:"$status._id"

        }
      }

    ])
    if (!status) {
      throw new apiError(400,"status not found")
      
    }

    return res.status(200).json(new apiResponse(200,status,"sucess"))




})

export {uploadStatus,deleteStatus,getAllStatus,getmystatus}