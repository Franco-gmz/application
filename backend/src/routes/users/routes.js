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

router.use('/update',(req,res,next) => {

    if(req.query.field == 'points' || req.query.field == 'purchases') req.valid = false;
    else req.valid = true;
    next();
})

//Routes

router.post('/register',(req,res) => {
    if(req.valid) {
        try{
            User.create(req.body, userId => {
                token = jwt.sign({id: userId},jwtConfig.secretKey, { expiresIn: 60*60*24 });
                res.status(200).json({token: token});
            });
        }
        catch(err){
            res.status(500).send({message:'Intentelo mas tarde'});
        }
    }
    else res.status(401).send({message:'Formulario de registro inválido'}); 
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

//Protected routes

router.get('/user', (req,res) => {
    let authorizationToken = req.header('authorization').split(' ')[1];
    if(!authorizationToken) res.status(401).send({message:'Debe proveer un token de acceso'});
    else{
        try{
            let decoded = jwt.verify(authorizationToken,secretKey);
            User.getById(decoded.id, user =>{
                if(user){
                    const {name,surname,email,points,purchases} = user;
                    res.status(200).send({name:name,surname:surname,email:email,points:points,purchases:purchases});
                }
                else res.status(401).send({message:'Token inválido'});
            })
        }
        catch(err){
            res.status(500).send({err});
        }
    }
});

router.put('/update', (req,res) => {
    if(req.valid){
        let authorizationToken = req.header('authorization').split(' ')[1];
        if(!authorizationToken) res.status(401).send({message:'Debe proveer un token de acceso'});
        try{
            let decoded = jwt.verify(authorizationToken,secretKey);
            User.update(decoded.id,req.query.field,req.query.value, _ => {
                res.status(200).send({message:'Actualizado correctamente'});
            });
        }
        catch(err){
            res.status(500).send({message:'Intentalo mas tarde'});
        }
    }
    else res.status(401).send({message:'No es posible modificar este dato'});
});

router.delete('/delete',(req,res) => {
    let authorizationToken = req.header('authorization').split(' ')[1];
    if(!authorizationToken) res.status(401).send({message:'Debe proveer un token de acceso'});
    try{
        let decoded = jwt.verify(authorizationToken,secretKey);
        User.delete(decoded.id, _ => {
            res.status(200).send({message:'Cuenta eliminada correctamente'});
        });
    }
    catch(err){
        res.status(500).send({message:'Intentelo mas tarde'});
    }
});


module.exports = router;