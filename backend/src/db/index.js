import { dbname } from '../constant.js';
import mongoose from 'mongoose';
export const dbconnect = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.dburl}/${dbname}`);
        console.log(`db connnected sucessfully on ${connection.connection.host}`);
    } catch (error) {
        console.log(`something went wrong ${error}`);
        process.exit(1);
    }
};
