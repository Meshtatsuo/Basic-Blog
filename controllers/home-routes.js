const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');
// Get all posts and their attributed information
router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'post_url',
                'title',
                'caption',
                'post_content',
                'user_id',
                'created_at',
            ],
            // include comments
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                // include username
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        // Generate post data for each post and add it to posts array
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({
                plain: true
            }));
            // pass a single post object into the homepage template
            res.render('homepage', {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
// send user to login page
router.get('/login', (req, res) => {
    res.render('login');
});

// send user to sign up page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// send user to dashboard and display all that user's posts
router.get('/dashboard', (req, res) => {
    if (req.session) {
        Post.findAll({
                where: {
                    user_id: req.session.user_id
                },
                attributes: [
                    'id',
                    'post_url',
                    'title',
                    'caption',
                    'post_content',
                    'user_id',
                    'created_at',
                ],
                include: [{
                        model: Comment,
                        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                        include: {
                            model: User,
                            attributes: ['username']
                        }
                    },
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            })
            .then(dbPostData => {
                const posts = dbPostData.map(post => post.get({
                    plain: true
                }));
                // pass a single post object into the homepage template
                console.log(req.session);
                res.render('dashboard', {
                    posts,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            })

    } else {
        res.render('login');
    }
})

// display logged out page when user logs out
router.get('/loggedout', (req, res) => {
    res.render('loggedout');
})

module.exports = router;