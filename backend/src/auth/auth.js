const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
require('../db/connection/dbConnection');
const User = require('../db/models/user');

const options = { usernameField:'email', passwordField:'password' }

passport.use('login', new localStrategy(options, async (email,password,done) => {

    await User.findOne({ email:email }, async (err,user) => {

        if(err) return done(err);
        else if(!user) return done(null, false, { message: 'Este usuario no existe' });
        else{
            let match = await user.matchPassword(password);
            if(match) return done(null,user);
            else return done(null, false, { message: 'Contraseña incorrecta' });
        }
    });

}))

module.exports = passport;