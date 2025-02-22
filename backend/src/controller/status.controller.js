import { Status } from "../Models/status.model.js";
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
console.log(response)
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
    consol.log("status id not found")
}
await deleteOnCloudninary(content.content.public_id)


    const status = await Status.findByIdAndDelete(statusId);
    if (!status) {
        return res.status(404).json({ message: 'Status not found' });
    }

    return res.status(200).json(new apiResponse(200, 'Status deleted successfully'));
});

export {uploadStatus,deleteStatus}