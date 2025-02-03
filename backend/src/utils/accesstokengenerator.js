import { User } from '../Models/usermodel.js';
import { apiError } from '../utils/apiError.js';
/**
 * The function generates an access token and a refresh token for a user identified by their userID.
 * @param userID - The `userID` parameter in the `generateAccessTokenAndRefreshToken` function is the
 * unique identifier of the user for whom you want to generate access and refresh tokens. This ID is
 * used to find the user in the database and then generate tokens for that specific user.
 * @returns The function `generateAccessTokenAndRefreshToken` returns an object containing the access
 * token and refresh token generated for the user. The structure of the returned object is as follows:
 */
export const generateAccessTokenAndRefreshToken = async (userID) => {
    try {
        const user = await User.findById(userID);
        const accessToken = await user.generateAccesToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(
            500,
            `something went wrong while generating refresh and access token ${error.message}`,
        );
    }
};
