const router = require('express').Router();
const passport = require('../../auth/auth');


router.get('/test',(req,res) => res.send('<h1>HOLA</h1>'));


router.post('/register',(req,res) => {
    res.send('todo ok')
});

router.post('/login',(req,res,next) => { 
    passport.authenticate('login',{ session: false }, (err,user,info) => {
        if(err) res.send(err);
        else if(!user) res.send({message:info.message});
        else res.send(user);})
    (req,res)});


module.exports = router;