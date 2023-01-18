const fs = require("fs");
const _ = require("lodash");
const authModel = require("../models/authModel");
const { BadRequest } = require("../utils/errors");


///////////// Register User ///////////////////////
async function RegisterUser(req, res, next) {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new BadRequest("Missing required field!")
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)//poner req.body.password,10)
            const registeredUser = await authModel.create({
                name: name,
                email: email,
                password: hashedPassword
            })
            console.log(registeredUser)
            console.log("user is registered")
            res.redirect("/");
        }
    }
    catch (err) {
        next(err);
    }
}


/////////////////// login user ////////////

async function loginUser(req, res,next) {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new BadRequest("Missing required field!")
        } else {
            passport.authenticate("local", {
                successRedirect: '/',
                failureRedirect: '/login', //if email is repetetive or passwordi s wrong
                failureFlash: true
            })
        }
    }
    catch(err){
        next(err)
    }

}

////////////// LOGOUT ///////////////////
async function logoutUser(req,res,next){
    req.logOut();
    res.clearCookie("connect.sid", { doamin: "localhost", path: "/" });
  
    //logged out and redirect to login
  
    req.session.destroy(function (error) {
      if (error) {
        return next(error)//check it later
      }
      res.redirect('/login');
    })
  }


module.exports = { RegisterUser, loginUser, logoutUser }

