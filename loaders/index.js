/**
 * Initialize Application Loaders.
 */

const expressLoader = require('./express');
const sequelizeLoader = require('./sequelize');
const logger = require('./logger');
const errors = require('./errors');

module.exports = async function(app){

	/**
	 * Database Connection.
	 */
	await sequelizeLoader();

	/**
	* Server Initialization.
	*/

	await expressLoader(app.expressApp);

	/**
	* Loggers Initialization.
	*/

	await logger(app.expressApp);

	/**
	* Error Handling Initialization.
	*/
	await errors(app.expressApp);

}
