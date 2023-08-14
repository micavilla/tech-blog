// import sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// Blog model extends base Model
class Blog extends Model {}
// Blog model schema with id, blog name, description, and date created columns
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // foreign key relating to User model id
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    // connection instance
    sequelize,
    // doesn't use timestamps or auto-pluralize, allows underscores, and custom model name
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);
// export Blog model
module.exports = Blog;