require('../connection/dbConnection');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const CRUD = {};

CRUD.create = async (user) => {
    newUser = new User({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        password:user.password
    });

    newUser.password = await newUser.encryptPassword(newUser.password);

    await newUser.save();
};

CRUD.getByEmail = async (email,done) => {
    await User.findOne({ email:email }, (err,user) => {
        if(err) throw(err);
        else if(!user) done(null);
        else done(user);
    });
};

CRUD.getById = async (id,done) => {
    await User.findOne({ _id:id }, (err,user) => {
        if(err) throw(err);
        else if(!user) done(null);
        else done(user);
    });
};

module.exports = CRUD;