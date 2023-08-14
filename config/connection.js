// import Sequelize library and enable acces to .env variables
const Sequelize = require('sequelize');
require('dotenv').config();
// create sequelize instance
let sequelize;
// use JawsDB on Heroku; otherwise user local MySQL database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
// export connection
module.exports = sequelize;