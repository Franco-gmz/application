require('../../connection/dbConnection');

const User = require('../../models/user');

const createUser = async (user) => {

    newUser = new User({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phone: user.phone,
    });

    await newUser.save();
}

module.exports = createUser;