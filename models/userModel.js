import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is Require"]
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email Is Required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password Is Mandatory"],
        minlength: [6, "Password length should be greater than 6 character"]
    },
    location: {
        type: String,
        default: 'India'
    },
},
    {
        timestamps: true
    });
//Middelware
userSchema.pre('save', async function () {
    if (!this.isModified) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//Compare Password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
};

//Json WebToken
userSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_TOKEN, { expiresIn: '1d' })
}

export default mongoose.model('User', userSchema);