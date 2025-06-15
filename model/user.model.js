const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Enter username"],
            unique: true,
            trim: true,
            minlength: [3, "Username must be at least 3 characters long."],
            maxlength: [30, "Username cannot exceed 30 characters."],
            match: [/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"]
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
        },
    }, { timestamps: true });

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Salt rounds: 10
        this.password = bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;