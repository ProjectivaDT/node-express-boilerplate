exports.build = function(app){
	const exampleCtrl = require('../modules/example/controller');
	const {isLoggedIn, permit} = require('./guards/permissions.js');
	const jwt = require('./middlewares/jwt');

	app.use(jwt());

	app
		.get('/api/v1/example', exampleCtrl.getall)
		.post('/api/v1/example', [isLoggedIn, permit], exampleCtrl.create)
}
