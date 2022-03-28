const {
    User
} = require('../models');

const userData = [{
        username: "DallasCoy",
        email: "DallasCoy@Gmail.com",
        password: "tempPassword1"
    },
    {
        username: "DannyG",
        email: "dannyg@gmail.com",
        password: "password1"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;