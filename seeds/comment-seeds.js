const {
    Comment
} = require('../models');

const commentData = [{
        comment_text: "This is a test comment. Good idea!",
        user_id: "1",
        post_id: "1"
    },
    {
        comment_text: "I find the topic you posted to be very interesting. Great work sharing this.",
        user_id: "2",
        post_id: "1",
    },
    {
        comment_text: "Are you sure? I don't think that's how that works",
        user_id: "2",
        post_id: "2",
    },
    {
        comment_text: "I'm pretty sure that's wrong. You may want to check your source",
        user_id: "1",
        post_id: "2"
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;