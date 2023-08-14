// import sequelize connection and models
const sequelize = require('../config/connection');
const { User, Blog,  } = require('../models');

// import seed data
const userData = require('./userData.json');
const blogData = require('./blogData.json');

// seed database function 
const seedDatabase = async () => {
  // sync sequelize models to database
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  for (const blog of blogData) {
    // assign random user ID to each blog
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  // exit process once seeding is complete
  process.exit(0);
};

// call seed database function
seedDatabase();