const {MaintenanceError} = require("../../helpers/errors.js")

const maintenance = false;

module.exports = function(){

	/**
	 * Middleware maintenance.
	 *
	 * Can be used to reject all requests if maintenance is set to true
	 */


	return (req, res, next) => {
		if(maintenance === true){
			throw new MaintenanceError("Server");
		}
		next();
	}
}
