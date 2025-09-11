import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        console.log("salt", salt);
        this.password = await bcrypt.hash(this.password, salt);
        console.log("password", this.password);
        /*
            salt $2b$10$BduNxybUiM6fJCReOb2Ghe
            password $2b$10$BduNxybUiM6fJCReOb2Ghenk/yRR3S7o14NvREpL1v5uV4drxjILu

            salt $2b$10$nyGJHNPIJlEsSIcaWae0E.
            password $2b$10$nyGJHNPIJlEsSIcaWae0E.QN/U7qjXOS1Fh1JvscX3r4iki4ft4kC
        */
        next();
    } catch (error) {
        next(error);
    }
});

// Update updatedAt field before saving
userSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log({ candidatePassword });
    console.log(this.password);
    return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

export const User = mongoose.models.User || mongoose.model('User', userSchema);
