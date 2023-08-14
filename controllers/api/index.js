// import express router
const router = require('express').Router();
// import route modules
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
// mount user, blog, and comment routes at /users, /blogs, and /comments
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
// export api router
module.exports = router;