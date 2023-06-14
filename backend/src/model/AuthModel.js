require("../config/DB")
const collection = require("../config/Collection")
const mongoose = require("mongoose")
const bcrypt = require('bcryptjs');

const AuthSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, "first name is required in field"] },
    lastName: { type: String, required: [true, "second name is required in field"] },
    gender: { 
        type: String,
        required: [true, "gender is required in field"],
        enum:["male","female","other"]
    },
    hobbies: { type: String, required: [true, "hobbies is required in field"], minLength: 1 },
    email: { type: String, unique: [true], required: [true, "email is required in field"] },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        // The regex pattern above enforces at least one lowercase, one uppercase, one digit, and one special character
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value);
            },
            message: 'Password must be 8 to 20 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        },
    },
    empId:{
        type:String,
        unique: [true],
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["manager","employee"]
    }
})

AuthSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const AuthUser = mongoose.model(collection.Auth, AuthSchema);

module.exports = AuthUser;
