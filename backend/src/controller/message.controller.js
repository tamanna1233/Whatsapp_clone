import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../Models/usermodel.js"
import {apiError} from "../utils/apiError.js"
import {apiResponse} from "../utils/apiResponse.js"
/* This code defines a function named `availablechats` using async/await syntax. Inside the function:
1. It awaits the result of `User.find(!req.user._id)`, which is likely intended to find chats that
do not belong to the current user.
2. It logs the `chats` variable to the console.
3. It checks if `chats` is falsy (empty or undefined) and throws an `apiError` with status code 400
and a message if it is falsy.
4. If `chats` is not falsy, it returns a JSON response with status 200 using
`res.status(200).json()` containing an `apiResponse` object with status 200, the `chats` data, and a
message indicating that available chats were found. */
const availablechats=asyncHandler(async(req,res)=>{
    console.log(req.user)
    const chats=await User.find({_id:{$ne:req.user._id}}) 
    if (chats.length === 0) {
        throw new apiError(400, "No available chats");
    }
    return res.status(200).json(new apiResponse(200,chats,"avalible chats find"))
})
export {
    availablechats
}