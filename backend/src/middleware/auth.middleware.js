import { asyncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../Models/usermodel.js"
import jwt from "jsonwebtoken"
/* This code snippet is defining a function named `verifyjwt` that is responsible for verifying a JSON
Web Token (JWT) for authentication purposes. Here's a breakdown of what the code is doing: */
 export const verifyjwt =asyncHandler(async(req,res,next)=>{
    try {
        const token=req?.cookies?.accessToken
        if(!token){
            throw new apiError(400,"unauthroised request")
        }
        const decodetokeninfo = jwt.verify(token, process.env.ACCESSTOKENSECRET);
        const user = await User.findById(decodetokeninfo?._id).select('-password -refreshToken');
        if (!user) {
            console.log(401, 'invalid access token');
            throw new apiError(401, 'invalid access token');
        }
        req.user = user;
    } catch (error) {
        console.log(401, error?.message || 'unauthorized request');
        throw new apiError(401, error?.message || 'unauthorized request')
        
    }
    next()
 })