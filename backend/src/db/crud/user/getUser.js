require('../../connection/dbConnection');

const User = require('../../models/user');

const getUser = async (user) => {

    const requiredUser = await User.findOne({ email:user.email });
    return requiredUser;
}

module.exports = getUser;