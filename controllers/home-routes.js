const router = require('express').Router();
const sequelize = require('../config/connection');
const {
    Post,
    User,
    Comment
} = require('../models');

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

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

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

router.get('/loggedout', (req, res) => {
    res.render('loggedout');
})

module.exports = router;