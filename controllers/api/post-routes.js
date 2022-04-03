const router = require("express").Router();
const sequelize = require("../../config/connection");
const {
  Post,
  User,
  Comment,
  Vote
} = require("../../models");

// get all posts
router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
      attributes: [
        "id",
        "post_url",
        "title",
        "created_at",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"
          ),
          "vote_count",
        ],
      ],
      order: [
        ["created_at", "DESC"]
      ],
      include: [{
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// send user to post creation page if session exists
router.get("/create", (req, res) => {
  if (!req.session) {
    res.render("login");
  } else {
    res.render("new-post", {
      loggedIn: req.session.loggedIn,
      username: req.session.username,
    });
  }
});

// get info from single post
router.get("/:id", (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_url", "title", "created_at"],
      include: [{
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
    .then((dbPostData) => {
      const post = dbPostData.get({
        plain: true,
      });
      // display single post page
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get single post for editing
router.get("/edit/:id", (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "post_url", "title", "caption", "post_content"],
    })
    .then((dbPostData) => {
      const post = dbPostData.get({
        plain: true,
      });
      res.render("edit-post", {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new post
router.post("/", (req, res) => {
  // expects {title: 'Title here!', post_url: 'https://example.com', caption:"null allowed", post_content: "Text for post", user_id: 1}
  Post.create({
      title: req.body.post_title,
      post_url: req.body.post_url,
      caption: req.body.post_caption,
      post_content: req.body.post_content,
      user_id: req.session.user_id,
    })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update post with new info, expects same info as the post route for creation
router.put("/", (req, res) => {
  console.log(req.body.post_id);
  Post.update({
      title: req.body.post_title,
      post_url: req.body.post_url,
      caption: req.body.post_caption,
      post_content: req.body.post_content,
    }, {
      where: {
        id: req.body.post_id,
      },
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// deletes post
router.delete("/", (req, res) => {
  Post.destroy({
      where: {
        id: req.body.post_id,
      },
    })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({
          message: "No post found with this id",
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;