exports.build = function(app){
	const serviceCtrl = require('../controllers/serviceCtrl');
	const {isLoggedIn, permit} = require('./security/permissions.js');
	const validations = require('./validations/sample');

	app
	.get('/api/v1/service/status', serviceCtrl.getStatus)
	.post('/api/v1/service/private', [isLoggedIn, permit, validations.setStatus], serviceCtrl.setStatus)
	.post('/api/v1/service/public', [validations.setStatus], serviceCtrl.setStatus)
}
