const mongoose = require("mongoose")

const authSchema = new moongose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        minlength: 8
    },
    password: {
        required: true,
        type: string
    }
})

module.exports = new mongoose.model("auth", authSchema);