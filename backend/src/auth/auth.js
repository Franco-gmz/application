const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
require('../db/connection/dbConnection');
const User = require('../db/crud/users');

const options = { usernameField:'email', passwordField:'password' };

passport.use('login', new localStrategy(options, (email,password,done) => {
    try{
        User.getByEmail(email, async (user)=> {
            if(!user) return done(null, false, { message: 'Este usuario no existe' });
            else{
                let match = await user.matchPassword(password);
                if(match) return done(null,user);
                else return done(null, false, { message: 'Contraseña incorrecta' });
            }});
    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport;