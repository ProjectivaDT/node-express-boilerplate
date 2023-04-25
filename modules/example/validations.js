const {BadRequestError, AuthorizationError} = require('../../helpers/errors')

const Validations = {
	setStatus: function(req, res, next) {
		if (!req.body.name || !req.body.status)
			throw new BadRequestError("user","No service name or status")

		next();
	}
}

module.exports = Validations;
