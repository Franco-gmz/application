require('../../connection/dbConnection');

const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const createUser = async (user) => {
    console.log('USER:',user);
    newUser = new User({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
        password:user.password
    });

    newUser.password = await newUser.encryptPassword(newUser.password);

    await newUser.save();
}

module.exports = createUser;