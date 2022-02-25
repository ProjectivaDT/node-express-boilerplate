module.exports = function(){

	/**
	 * Middleware roles.
	 *
	 * Can be used to get and sanitize roles from req.tokenPayload
	 */


	return (req, res, next) => {
		if(req.isAuthenticated && req.tokenPayload && req.tokenPayload.roles) {
			var userRoles = req.tokenPayload.roles.map((item) => {
				return item.scope.toUpperCase();
			})
			req.roles = userRoles;
		}
		next();
	}
}
