const router = require('express').Router();
const passport = require('../../auth/auth');
const validation = require('../../validation/registerValidation');

router.get('/test',(req,res) => res.send('<h1>HOLA</h1>'));

//Middlewares
router.use('/register', (req,res,next) =>{
    validation(req, (valid) => {
        if(valid) req.valid = true;
        else req.valid = false;
        next();
    });  
})

//Routes
router.post('/register',(req,res) => {
    if(req.valid) res.send({message:'TODO OK'});
    else res.send({message:'INVALID'});
});

router.post('/login',(req,res,next) => { 
    passport.authenticate('login',{ session: false }, (err,user,info) => {
        if(err) res.send(err);
        else if(!user) res.send({message:info.message});
        else res.status(200).send(user);})
    (req,res)});


module.exports = router;