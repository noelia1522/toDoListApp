const express = require('express')
const router = express.Router();
const passport = require('passport')
const initializePassport = require('../config/passport-config')
const authController = require("../controllers/authController")

//const users = []


//this is only used cause we are not using a DB for now and we do the checks on the array users
//initializePassport(		
  //passport,
 // email => users.find(user => user.email === email),
 // id => users.find(user => user.id === id)
//)

router.get('/', authController.checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
  })
  
  router.get('/login', authController.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  router.post('/login', authController.checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
  });
  
  router.get('/register', authController.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  router.post('/register', authController.checkNotAuthenticated, authController.register)

  
  router.delete('/logout', (req, res) => {
    req.logOut()        //also passport function
    res.redirect('/login')
  })

  /*
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
*/

  module.exports = router;
