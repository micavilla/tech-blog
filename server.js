// import packages
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// import route handlers and helpers
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// import sequelize and connect sessions store
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create express app instance and set port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// session configuration object
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// add session middleware using session configuration
app.use(session(sess));

// Inform Express.js on handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// parse JSON and url-encoded requests, and serve static files from public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// mount routes
app.use(routes);

// sync sequelize models then start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
})