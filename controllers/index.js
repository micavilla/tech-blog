// import express router
const router = require('express').Router();
// import route api and home route files
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
// mounts routes at / and /api
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
// export main app router
module.exports = router;