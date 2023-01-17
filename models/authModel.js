const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        minlength: 8
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = new mongoose.model("auth", authSchema);