import { model, Schema } from 'mongoose';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required'],
            lowercase: true,
            trim: true,
        },
        phoneNo: {
            type: String,
            required: [true, 'mobile number is required'],
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        username: {
            type: String,
            required: [true, 'username is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        profilePic: {
            type: {
                url: string,
            },
            default:
                'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        },
    },
    {
        timestamps: true,
    },
);
userSchema.pre('save', async function name(next) {
    if (!this.isModified('password')) return next();
    this.password = argon2.hash(this.password, { type: argon2.argon2id });
});
userSchema.methods.isPasswordCorrect = async function (password) {
    return argon2.verify(this.password, password);
};
userSchema.methods.generateeAccesToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            phone: this.phoneNo,
        },
        process.env.AccessTokenSecret,
        {
            expiresIn: process.AccessTokenExpiry,
        },
    );
};

userSchema.methods.generateREfreshToken = async function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.RefreshTokenSecret,
        {
            expiresIn: process.env.RefreshTokenExpiry,
        },
    );
};

export const user = model('user', userSchema);
