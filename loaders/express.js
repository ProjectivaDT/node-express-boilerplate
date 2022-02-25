/**
 * Express Initialization .
 */

/**
 * Module dependencies.
 */

const cors         = require("cors");
const helmet       = require('helmet');
const bodyParser   = require('body-parser');
const jwt          = require('./middlewares/jwtMiddleware');
const roles        = require('./middlewares/roles')
const versioning   = require('./middlewares/versioning')
const maintenance  = require('./middlewares/maintenance')
const routes       = require('../routes/api')

/**
 * Module execution.
 */

const execute = async function(app){
	app.set('port', process.env.PORT || 3000);
	app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true, })); // support encoded bodies
	app.use(helmet());
	app.use(cors());

	/**
	 * Uncomment the required Middleware.
	 */

	app.use(jwt());

	// app.use(versioning());
	// app.use(maintenance());
	// app.use(roles());

	routes.build(app);
}

module.exports = execute;
