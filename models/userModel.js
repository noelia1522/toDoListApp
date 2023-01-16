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

    password:{
        type:String,
        },
    
    parent: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User" //objectId is refereing to User collection
    }

})


module.exports = new mongoose.model("User", userSchema);
//"user" es el nombre de la coleccion