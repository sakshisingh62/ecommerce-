const mongoose = require("mongoose");
const { randomUUID } = require("crypto");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        default: () => randomUUID()
    },

    name: {
        type: String,
        required: true,
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);