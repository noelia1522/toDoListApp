//estructura que usa para crear coleccion en atlas mongo db

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: String,
    completed: false,
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }

})


module.exports = new mongoose.model("Task",taskSchema);
