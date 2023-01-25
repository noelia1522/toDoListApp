const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true
    },
 })

//Schema BEFORE auth
/* const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        //minlength: 8,
    },
    age: {
        type: Number,
        validate: {  //haven't try the age validation (JAN 12)
            validator: a => a > 18,
            message: "You're under 18!"
        }
    },
    parent: { //add relation with other docs
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"  //which module to use for populating
    }
}) */

//exporting sort of constructor
module.exports = new mongoose.model("User", userSchema); //"User" is the collection name





/*const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        unique: true,
        type: String,
    uppercase: true
    },
    email:{
        type: String,
        minlength: 8
    } ,

    age:{
        type:Number,
        min:18,
        validator:{
           validator:a => a > 18,
           message: "you are under 18! you cannot enter!"
        },
    
    parent: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" //objectId is refereing to User collection
    }

}})


module.exports = new mongoose.model("User", userSchema);
//"user" es el nombre de la coleccion*/