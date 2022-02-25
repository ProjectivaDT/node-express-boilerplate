/**
 * HTTP REQUEST LOGGER INITIALIZATION.
 */

/**
 * Loader Dependencies
 */

const fs           = require('fs')
const path         = require('path')
const rfs          = require('rotating-file-stream')
const morgan = require('morgan')
const config = require('../config')


/**
 * Loader Initialization Function
 */

module.exports = async function(app){

  if(config.logHttpRequests){

    var logDirectory = 'logs'
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

    var accessLogStream = rfs('access.log', {
      interval: '7d', // rotate weekly
      path: logDirectory
    })


    /**
    * Logger Middleware Initialization
    */

    app.use(morgan('[:date[clf]] - :remote-addr ":method :url HTTP/:http-version" - :status :response-time ms', {stream: accessLogStream}))
  }
};
