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
        about:{
            type:String,
            trim:true,
            lowercase:true,
            default:"hi there i am using whatsapp"
        },
        statuses:[{
          type:Schema.Types.ObjectId,
          ref:"Status"
        }],
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        profilePic: {
            type: {
                url: String,
                public_id:String
            },
            default:
                'https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?w=210&h=210&c=7&r=0&o=5&dpr=1.3&pid=1.7',
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
);
/* The `userSchema.pre('save', async function name(next) { ... })` middleware function in the Mongoose
schema is a pre-save hook that runs before saving a user document to the database. */
userSchema.pre('save', async function name(next) {
    if (!this.isModified('password')) return next();
    this.password = await argon2.hash(this.password, { type: argon2.argon2id });
    next()
});

/* The `userSchema.methods.isPasswordCorrect` function is a method defined on the userSchema that is
used to verify if a given password matches the hashed password stored in the user document. */
userSchema.methods.isPasswordCorrect = async function (password) {
    return await argon2.verify(this.password, password);
};
/* The `userSchema.methods.generateAccessToken` function is a method defined on the userSchema that
generates a JSON Web Token (JWT) access token for a user. */
userSchema.methods.generateAccesToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            name: this.name,
            phone: this.phoneNo,
        },
        process.env.AccessTokenSecert,
        {
            expiresIn: process.env.AccessTokenSExpiry,
        },
    );
};

/* The `userSchema.methods.generateRefreshToken` function is a method defined on the `userSchema` that
generates a JSON Web Token (JWT) refresh token for a user. */
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            id: this._id,
        },
        process.env.RefreshTokenSecert,
        {
            expiresIn: process.env.RefreshTokenExpiry,
        },
    );
};

export const User = model('user', userSchema);
