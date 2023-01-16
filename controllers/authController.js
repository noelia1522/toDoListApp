const fs=  require("fs");
const _ = require("lodash");
const authModel= require("../models/authModel");
const { BadRequest } = require("../utils/errors");


///////////// Register User ///////////////////////
async function RegisterUser(req,res,next){
    const {name,email,password} = req.body;

    try{
        if(!name ||!email || ! password){
            throw new BadRequest("Missing required field!")
        }else{
            const registeredUser= await authModel.create({
                name:name,
                email:email,
                password: hashedPassword
            })
            console.log(registeredUser)
            console.log("user is registered")
            res.redirect("/");
        }
    }
    catch(err){
        next(err);
    }
}


/////////////////// login user ////////////




