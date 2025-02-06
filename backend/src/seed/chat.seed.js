import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import { User } from "../Models/usermodel.js"
import argon2 from 'argon2';
import { dbname } from '../constant.js';
console.log(`${process.env.dburl}/${dbname}`)
// Connect to MongoDB
const connectDB = async () => {
    try {
           const connection = await mongoose.connect(`${process.env.dburl}/${dbname}`);
           console.log(`db connnected sucessfully on ${connection.connection.host}`);
       } catch (error) {
           console.log(`something went wrong ${error}`);
           process.exit(1);
       }
};

// Generate fake users
const generateUsers = async (count = 10) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        const hashedPassword = await argon2.hash('Password123', { type: argon2.argon2id });

        users.push({
            name: faker.person.fullName(),
            phoneNo: faker.phone.number(),
            email: faker.internet.email().toLowerCase(),
            username: faker.internet.userName().toLowerCase(),
            about: faker.lorem.sentence(),
            password: hashedPassword,
            profilePic: {
                url: faker.image.avatar(),
                public_id: null,
            },
            refreshToken: '',
        });
    }

    return users;
};

// Seed the database
const seedDatabase = async () => {
    await connectDB();
    
    // Clear existing users (optional)
    await User.deleteMany();
    console.log('Existing users deleted');

    const users = await generateUsers(10);
    await User.insertMany(users);

    console.log(`${users.length} users inserted successfully`);
    mongoose.connection.close();
};

// Run the seeding script
seedDatabase().catch(err => console.error(err));
