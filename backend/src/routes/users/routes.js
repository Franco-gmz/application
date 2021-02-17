const router = require('express').Router();
const createUser = require('../../db/crud/user/createUser');

router.get('/test',(req,res) => res.send('<h1>HOLA</h1>'));


router.post('/register',(req,res) => {
    createUser(req.body)
    .then(_ => {return 'string retornado'})
    .then(msg => res.send('<h1>'+msg+'</h1>'))
    .catch(err => console.log(err));

});


module.exports = router;