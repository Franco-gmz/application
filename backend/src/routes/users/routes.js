const router = require('express').Router();
const { validationResult } = require('express-validator');
const passport = require('../../auth/auth');
const validation = require('../../validation/registerValidation');

router.get('/test',(req,res) => res.send('<h1>HOLA</h1>'));


router.post('/register',validation,(req,res) => {
    let errors = validationResult(req);
    if(errors.isEmpty()) res.status(200).send({message:'Todo OK'});
    else res.status(401).send({message:'Invalid inputs'});
});

router.post('/login',(req,res,next) => { 
    passport.authenticate('login',{ session: false }, (err,user,info) => {
        if(err) res.send(err);
        else if(!user) res.send({message:info.message});
        else res.status(200).send(user);})
    (req,res)});


module.exports = router;