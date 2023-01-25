
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: String
    /* ,
    completed: Boolean,
    owner: { //add relation with other docs
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  //which module to use for populating
    }
    */
})

//exporting sort of constructor
module.exports = new mongoose.model("Task", taskSchema);


/*//estructura que usa para crear coleccion en atlas mongo db
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
   task:  String
/*
    text: String,
    completed: false,
    parent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    }

})


module.exports = new mongoose.model("Task",taskSchema);*/
