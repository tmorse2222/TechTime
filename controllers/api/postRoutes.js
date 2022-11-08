const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET post by id and push to handlebars
router.get('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
            ],
        });
        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST new comment and reload single-post with new post data
router.post('/comments', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT update post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                body: req.body.body,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});



module.exports = router;