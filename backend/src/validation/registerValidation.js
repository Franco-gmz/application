const { body } = require('express-validator');

const valMiddleware = [

    body(['name','surname']).isLength({ min:3, max:15 }),
    body('email').isEmail(),
    body('password').isLength({ min:10, max:30})
];

module.exports = valMiddleware;