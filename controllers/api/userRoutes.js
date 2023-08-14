// import express router and Comment model
const router = require('express').Router();
const { User } = require('../../models');
// POST method to create new user with request body
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    // save new user id to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
// POST method for existing user to log in
router.post('/login', async (req, res) => {
  try {
    // find user by email
    const userData = await User.findOne({ where: { email: req.body.email } });
    // send message if user is not found
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // verify password
    const validPassword = await userData.checkPassword(req.body.password);
    // send message if password is invalid
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    // save session data and redirect
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.redirect('/');
    });
  // catch any errors and send err
  } catch (err) {
    res.status(400).json(err);
  }
});
// POST method to log out
router.post('/logout', (req, res) => {
  // destroy session if logged in
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
// export user router
module.exports = router;