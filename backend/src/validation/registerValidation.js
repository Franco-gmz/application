const { body, validationResult } = require('express-validator');

const validations = [

    body(['name','surname']).isLength({ min:3, max:15 }),
    body('email').isEmail(),
    body('password').isLength({ min:10, max:30})
];

const validation = async (req,done) => {
    
    for (let val of validations) {
        const result = await val.run(req);
        if (result.errors.length) break;
    } 
    const errors = validationResult(req);
    if (errors.isEmpty()) done(true);
    else return done(false);
};

module.exports = validation;