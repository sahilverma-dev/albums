"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    authProvider: {
        type: String,
        required: true,
        enum: ["Google", "Email/Password", "Random"],
    },
    verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    avatar: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "users",
});
exports.User = (0, mongoose_1.model)("User", userSchema);
