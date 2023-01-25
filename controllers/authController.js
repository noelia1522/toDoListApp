const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const passport = require('passport')
const initializePassport = require('../config/passport-config')

function showIndex (req, res){
    res.render('index.ejs', { name: req.user.name })
}

function showLogin (req, res){
    res.render('login.ejs')
}

function showRegister (req, res){
    res.render('register.ejs')
}

async function register(req, res) {
    //Create a has version of the passwd
    console.log(req.body.password)
    console.log(req.body.name)
    console.log(req.body.email)
    const hashedPassword = await bcrypt.hash(req.body.password, 10); //what's the number for? salt = 10;

    try {
        await User.create({
            name: req.body.name,  //mind the names in the HTML form!
            email: req.body.email,
            password: hashedPassword  //saving the hashed not the plain text!
        })
        res.redirect('/login')
    }
    catch (error) {
        console.log(error.message);
        res.redirect('register');
    }
}

initializePassport(passport)
//Importan note: passport.authenticate it's a function and thus, it
// should have the parameters req, res and next
function logIn(req, res, next){
    passport.authenticate("local", { //'local' is the strategy we use
        successRedirect: '/',
        failureRedirect: '/login', //if email or pass is wrong
        failureFlash: true
        }) (req,res)
        
}

function logOut(req, res) {
    //Predifiend method in the request
    req.logOut;

    //delete the cookie
    res.clearCookie("connect.sid", { path: "/" });

    //logged out and redirect to login
    req.session.destroy(function (error) {
        if (error) {
            return next(error) //chek later
        }
        //if no error, then redirect
        res.redirect('/login');
    })
}

//helper middleware
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {    //a passport function
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}



module.exports = { checkAuthenticated, checkNotAuthenticated, logOut, register, showIndex, showLogin, showRegister, logIn }