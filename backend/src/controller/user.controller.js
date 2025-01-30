import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { User } from '../Models/usermodel.js';
import { apiResponse } from '../utils/apiResponse.js';
import { deleteOnCloudninary, uploadOnCloudinary } from '../utils/cloudnariy.js';
import {generateAccessTokenAndRefreshToken} from "../utils/accesstokengenerator.js"

/* The `register` function is a controller function that handles the registration functionality for a
user. Here's a breakdown of what it does: */
const register = asyncHandler(async (req, res) => {
    const { name, phoneNo, email, username, password } = req.body;
    if ([name, phoneNo, email, username, password].some((field) => String(field).trim() == '')) {
        throw new apiError(400, 'fields are required');
    }
    /* This code snippet is checking if the provided email, phone number, or username already exists in
    the database. */
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNo }, { username }] });
    if (existingUser) {
        const errorMessage=[]
        if(existingUser.email===email){
            errorMessage.push("email")
        }
    else if (existingUser.phoneNo==phoneNo){
        errorMessage.push("phone no")
    }
    else if(existingUser.username){
        errorMessage.push("username")
    }

        throw new apiError(400, `  ${errorMessage.join(",") } are already use by  another user`);
    }
    const avatar =req.file.path
  
    const profilepic=await uploadOnCloudinary(avatar)
    if(!profilepic){
        throw new apiError(500,"something went wrong while uploading on cloudinary")
    }

    // create user data
    const user = await User.create({
        name: name,
        phoneNo: phoneNo,
        email: email,
        username: username,
        password: password,
        profilePic:{
            url:profilepic.url ,public_id:profilepic.public_id
        },
    });
    if (!user) {
        throw new apiError(500, 'Error in registring user');
    }
    return res.status(201).json(new apiResponse(201, 'user registered successfully'));
});

/* The `login` function is a controller function that handles the login functionality for a user.
Here's a breakdown of what it does: */

const login = asyncHandler(async (req, res) => {
    const { phoneNo, password } = req.body;
    if ([phoneNo, password].some((field) => String(field).trim() == '')) {
        throw new apiError(400, 'fields are required');
    }
    const user = await User.findOne({ phoneNo });
    if (!user) {
        throw new apiError(400, 'user not found');
    }
    const isvalidpassword = await user.isPasswordCorrect(password);
    if (!isvalidpassword) {
        throw new apiError(400, 'invalid password');
    }
  
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
    const loggedinUser = await User.findById(user._id).select('-password -refreshtoken');
    loggedinUser.refreshToken = refreshToken;
    await loggedinUser.save({
        validateBeforeSave: false,
    });
    const option = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };
    return res
        .status(200)
        .cookie('accessToken', accessToken, option)
        .cookie('refreshToken', refreshToken, option)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedinUser,
                    accessToken,
                    refreshToken,
                },
                'user login successfully',
            ),
        );
});

/* The `logout` function is a controller function that handles the logout functionality for a user.
Here's a breakdown of what it does: */
const logout = asyncHandler(async (req, res) => {
    const _id = req?.user?._id;
    await User.findByIdAndUpdate(
        _id,
        {
            $unset: { refreshToken: 1 },
        },
        { new: true },
    );
    return res.status(200).json(new apiResponse(200, 'user logout successfully'));
});

/* The `currentUser` function is a controller function that is used to get the details of the currently
logged-in user. It is an asynchronous function that takes `req` (request) and `res` (response)
parameters. */
const currentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new apiResponse(200, req.user, 'current user'));
});

export { register, login, logout, currentUser };
