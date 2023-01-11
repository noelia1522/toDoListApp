const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id:{ uuidv4(),
        text: req.body.newTask,
        completed: false
    },
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }

})


module.exports = new mongoose.model("Task",taskSchema);
