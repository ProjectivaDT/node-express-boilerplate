const exceptionHandler = require('./loaders/exceptionHandler');
const express = require('express');
const app = express();

const cors         = require("cors");
const helmet       = require('helmet');
const bodyParser   = require('body-parser');
const routes       = require('./routes/api')

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({limit: '50mb'})); // increase json size to be able to receive images or docs
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(helmet());
app.use(cors());

routes.build(app);

exceptionHandler(app);

module.exports = app;
