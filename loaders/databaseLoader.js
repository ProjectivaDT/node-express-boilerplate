/**
 * Database Connection Initialization
 */

const { Sequelize } = require('sequelize');
const config = require('../config');

const databaseLoader =  async function() {
  if (process.connection){
    return process.connection;
  }

  const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
    pool: {
    max: parseInt(config.database.pool),
    idle: parseInt(config.database.idle),
    acquire: parseInt(config.database.timeout),
    },
    logging: false
  });

  try {
    await sequelize.authenticate();
    process.connection = sequelize;
  } catch (error) {
    throw Error("Unable to connect to the database")
  }
}

module.exports = databaseLoader;
