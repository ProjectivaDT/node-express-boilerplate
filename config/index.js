'use strict';
require('dotenv').config();

module.exports = {
	port: process.env.PORT,
	database: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_DATABASE,
		pool: process.env.DB_POOL_MAX,
		idle: process.env.DB_POOL_IDLE,
		timeout: process.env.DB_POOL_ACQUIRE
	},
	tokenSecret: process.env.TOKEN_SECRET,
	environment: process.env.ENVIRONMENT
}
