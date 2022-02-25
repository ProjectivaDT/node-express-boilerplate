/**
 * Module dependencies.
 */

const {BaseError} = require('../helpers/errors')
const logger = require('../helpers/logger');


/**
 * Class Error Handler - used to catch Errors thrown by the service
 */

class ErrorHandler {
    async handleError(err, res){
        logger.warn("Controlled Error -- ",err);
        res.status(err.httpCode);
        res.send({error: err.message});
    }

    async handleUnknownError(err, res){
        logger.error("Unknown Error -- ",err);
        if(err.statusCode)
            res.status(err.statusCode)
        else
            res.status(500)

        res.send({ error: err })
    }

    isTrustedError(error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

const catchError = function(app){
    var errorHandler = new ErrorHandler();

    app.use(async (err, req, res, next) => {
        if (errorHandler.isTrustedError(err)) {
            errorHandler.handleError(err, res);
        } else {
            errorHandler.handleUnknownError(err, res)
        }
    });

    process.on('unhandledRejection', (reason, promise) => {
        logger.error('Unhandled Rejection at: %s', reason)
    });

    process.on('uncaughtException', (error, source) => {
        logger.error('Uncaught Exception', {error, source});
    });
}


module.exports = catchError;
