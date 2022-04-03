const {
    User
} = require('../models');

const userData = [{
        username: "DallasCoy",
        email: "DalC@medician.co",
        password: "$2a$10$4SEknG6rLzgGMQS1oJnr9eZ7gwqn5W.p06k3umD1KeweBCM8ddrQq"
    },
    {
        username: "DannyG",
        email: "DanG@medician.co",
        password: "$2a$10$b5le3BSJAPdP2DL9X7Mk5ujtnu.3/R/cvmimY/PjwMeUu91X9.vAC"
    },
    {
        username: "RickHayes",
        email: "rickh@medician.co",
        password: "$2a$10$7.CMAL9eyWE5M5QDtsFPMOJHJKShpTLMHMSkigHznazl8LPR4/Gh."
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;