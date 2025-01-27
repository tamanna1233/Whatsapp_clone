import {User} from "../Models/usermodel.js"
import {apiError} from "../utils/apiError.js"
export const generateAccessTokenAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = await user.generateAccesToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, 'something went wrong while generating refresh and access token');
    }
};
