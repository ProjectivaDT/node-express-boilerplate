const {MissingHeaderError, AppVersionError} = require("../../helpers/errors.js")

var minimum_version = '0.0.1';

module.exports = function(){

	/**
	 * Middleware Versioning.
	 *
	 * Can be used to check clients required Minimum Version
	 */

	return (req, res, next) => {

		if(req.headers) {

			if(req.headers["requestfrom"] == "App" && !req.headers["appversion"])
				throw new MissingHeaderError("Middleware", "Missing appversion header");

			else if(req.headers["requestfrom"] == "App" && req.headers["appversion"]){

				if(minimum_version > req.headers["appversion"])
					throw new AppVersionError("Client", "Low App Version");
			}
		}

		next();
	}
}
