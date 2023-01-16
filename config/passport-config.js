const LocalStrategy = require('passport-local').Strategy //importing the strategy we use, local : local strategy
const bcrypt = require('bcrypt') //to hash the password
const User= require("../models/user")

//Working with db we have to use await and async!!!!

//function initialize(passport, getUserByEmail, getUserById) {
function initialize(passport) {
  const customFields = {
    usernameField: "email",
    passwordField: "password",
  };

  //This is the callback function that goes inside localstrategy setup
  const authenticateUser = async (email, password, done) => {
    //const user = getUserByEmail(email)  
    const user = await User.findOne({email: email})   

    if (!user) {
      return done(null, false, { message: 'No user with that email' })
      //se pone false porque es el caso de que no hay user
    }

    //si hay user:

    try {
      //user.password the one in the array and password the one we get from the user
      if (await bcrypt.compare(password, user.password)) {
        //si las contraseñas son iguales:
        return done(null, user)
      } else {
        //si las contraseñas no son iguales
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy(customFields, authenticateUser))

  //save user.id in our session
  //done is a callback function, you ca ¡n use any other name
  passport.serializeUser((user, done) => {
    //first (1) parameter in done(1,2) is true if 
    return done(null, user.id) ///(DB error(null), user(user.id), error message)
  })

  //get the id and retrieve the user
  passport.deserializeUser (async(id, done) => {
    const user= await User.findOne({_id: id }) //el segundo id es el mismo que el de deserializeUser
    return done(null,user);
  })
}
33

module.exports = initialize;