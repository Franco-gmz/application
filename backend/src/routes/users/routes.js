const router = require('express').Router();
const passport = require('../../auth/auth');
const validation = require('../../validation/registerValidation');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt.config');
const { secretKey } = require('../../config/jwt.config');
const User = require('../../db/crud/users');

router.get('/test',(req,res) => res.send('<h1>HOLA</h1>'));

//Middlewares
router.use('/register', (req,res,next) =>{
    validation(req, (valid) => {
        if(valid) req.valid = true;
        else req.valid = false;
        next();
    });  
});

//Routes
router.post('/register',(req,res) => {
    if(req.valid) res.send({message:'TODO OK'});
    else res.send({message:'INVALID'});
});

router.post('/login',(req,res,next) => { 
    passport.authenticate('login',{ session: false }, (err,user,info) => {
        if(err) res.send(err);
        else if(!user) res.send({message:info.message});
        else{
            token = jwt.sign({id: user._id},jwtConfig.secretKey, { expiresIn: 60*60*24 })
            res.status(200).send({token: token});
        }
    })(req,res,next)
});

router.get('/user', (req,res) => {

    let authorizationToken = req.headers.authorization;

    if(!authorizationToken) res.status(401).send({message:'Must provide an access token'});
    else{
        try{
            let decoded = jwt.verify(authorizationToken,secretKey);
            User.getById(decoded.id, user =>{
                if(user){
                    const {name,surname,email,points,purchases} = user;
                    res.status(200).send({name:name,surname:surname,email:email,points:points,purchases:purchases});
                }
                else res.status(401).send({message:'Invalid token'});
            })
        }
        catch(err){
            res.status(500).send({err});
        }
    }
});


module.exports = router;