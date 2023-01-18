const express = require('express')
const router = express.Router();
const passport = require('passport')
const bcrypt = require('bcrypt')
const initializePassport = require('../config/passport-config')
//we import the config file 
const { RegisterUser, loginUser, logoutUser } = require('../controllers/authController');


initializePassport(passport)

//////////////// MAIN PAGE ///////////////////////

router.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})


///////////// LOGIN PAGE ///////////////////////

router.get('/login', checkNotAuthenticated, (req, res) => {//if the user is logged in, she shouldn't see the login page
  res.render('login.ejs')//this function is implimented
})

router.post('/login', checkNotAuthenticated, loginUser)

//////////////// REGISTER PAGE /////////////////////

router.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

router.post('/register', checkNotAuthenticated, RegisterUser)

//////////// LOGOUT ////////////////

router.delete('/logout', logoutUser)


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
  res.redirect('/register')
  next()
}


module.exports = router;
