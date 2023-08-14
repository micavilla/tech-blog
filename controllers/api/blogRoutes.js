// import express router, Blog and Comment models, and authorization middleware
const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// GET method to read blog post by id and its associated comments
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: Comment }]
    });
    res.status(200).json(blogData);
    // 404 if no matching blog
    if(!blogData) {
      res.status(404).json({ message: 'No blog found with this ID'});
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// POST method to create new blog post from request body and current user id
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
// PUT method to update blog post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE method to destroy blog with matching id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // 404 if no matching blog
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// export blog router
module.exports = router;