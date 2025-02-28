import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * The code defines two asynchronous functions for uploading and deleting files on Cloudinary, handling
 * errors and cleaning up temporary files.
 * @param localFilePath - `localFilePath` is the path to the file that you want to upload to
 * Cloudinary. It should be a string representing the local file path on your server.
 * @returns The `uploadOnCloudinary` function returns the response object after uploading a file to
 * Cloudinary, or `null` if the `localFilePath` parameter is not provided or if an error occurs during
 * the upload process. The `deleteOnCloudinary` function does not return anything explicitly, but it
 * deletes an image from Cloudinary based on the `public_id` provided, or logs an error message
 */
const uploadOnCloudinary = async (localFilePath) => {
    console.log('local ', localFilePath);
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
        });
        // console.log("file uploaded successfully" ,response.url)
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); //remove the locally saved temperary file on server
    }
};

const deleteOnCloudninary = async (public_id) => {
    try {
        if (!public_id) {
            return null;
        }
        await cloudinary.uploader.destroy(public_id, { resource_type: 'image' });
    } catch (error) {
        console.log(error.message);
    }
};

export { uploadOnCloudinary, deleteOnCloudninary };
