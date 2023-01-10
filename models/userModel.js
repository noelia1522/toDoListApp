const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        unique: true,
uppercase: true
    },
    email:{
        type: String,
        minlength: 8
    } ,

    age:{
        type:Number,
        validator:{
            validator:a => a > 18,
            message: "you are under 18! you cannot enter!"
        }
    } 

})

module.exports = new mongoose.model("User", userSchema);
//"user" es el nombre de la coleccion