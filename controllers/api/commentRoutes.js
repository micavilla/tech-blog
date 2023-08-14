// import express router, Comment, and authorization middleware
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// GET method to read all comments
router.get('/', (req, res) => {
  Comment.findAll({})
  .then(commentData => res.json(commentData))
  .catch(err => {
    res.status(500).json(err);
  });
});
// GET method to find comment by id
router.get('/:id', (req, res) => {
  Comment.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(commentData => res.json(commentData))
  .catch(err => {
    res.status(500).json(err);
  });
});
// POST method to create new comment from request body and current user id
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// DELETE method to delete comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// export comment router
module.exports = router;