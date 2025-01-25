import { asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from '../utils/apiError.js'
import { User } from "../Models/usermodel.js";
import {apiResponse} from '../utils/apiResponse.js'

// register user 
const register = asyncHandler(async(req ,res)=>{
    const 
    {name,phoneNo,email,username,password,profilePic} = req.body;
    if([name,phoneNo,email,username,password].some((field)=>field.trim()=='')){
        throw new apiError(400,"fields are required");
    }
    const existingUser = await User.findOne
    ({$or:
        [{email},
            {phoneNo},{username}
        ]});
        if(existingUser){
            throw new apiError(400,"user already exists");
        }
    console.log(name,phoneNo,email,username,password,profilePic)

// create user data
const user = await User.create({
    name:name,
    phoneNo:phoneNo,
    email:email,
    username:username,
    password:password,
    profilePic:profilePic

})
if(!user){
    throw new apiError(500,"Error in registring user")
}
return res
.status(201)
.json(new apiResponse(201,'user registered successfully'))
})
// login 
const login = asyncHandler(async(req,res)=>{
    const {phoneNo,password}= req.body
    if([phoneNo,password].some((field)=>field.trim()=='')){
        throw new apiError(400,"fields are required")
        }
    const user = await User.find({phoneNo})
    if(!user){
        throw new apiError(400,"user not found")
    }
    const isvalidpassword = await user.isPasswordCorrect(password)
    if(!isvalidpassword){
        throw new apiError(400,"invalid password")
    }
    const {accessToken, refreshToken}= await generateeAccesTokenAndgenerateREfreshToken(user._id).select('-password-refreshToken');
    logg
})

export {register}