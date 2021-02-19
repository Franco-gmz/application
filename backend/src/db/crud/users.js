require('../connection/dbConnection');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const CRUD = {};

CRUD.create = async (user,done) => {
    newUser = new User({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        password:user.password
    });

    newUser.password = await newUser.encryptPassword(newUser.password);

    await newUser.save();
    done(newUser._id);
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

CRUD.update = async (id,field,value,done) => {
    let update = {};
    update[field] = value;
    await User.findOneAndUpdate({_id:id}, { $set: update}, done);
};

CRUD.delete = async (id,done) => {
    await User.deleteOne({_id:id},done);
}

module.exports = CRUD;