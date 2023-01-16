const mongoose = require("mongoose");

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
//"user" es el nombre de la coleccion