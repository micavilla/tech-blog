// import User, Blog, and Comment models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
// User can have many Blogs
User.hasMany(Blog, {
  // Blog has user_id foreign key
  foreignKey: 'user_id',
  // delete blogs if user is deleted
  onDelete: 'CASCADE'
});
// Blog belongs to a User
Blog.belongsTo(User, {
  foreignKey: 'user_id'
});
// Blog can have many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id'
});
// Comment belongs to a user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  // delete user's comments if user  is deleted
  onDelete: 'CASCADE'
});
// export models
module.exports = { User, Blog, Comment };