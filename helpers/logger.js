const config  = require('../config');
const winston = require('winston');

class Logger {
    logger;

    constructor() {
        if (Logger._instance) {
            return Logger._instance;
        }

        this.initialize();
        Logger._instance = this;
    }

    initialize() {

        let format, level;

        if(config.environment == 'development'){
            format = winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp(),
                winston.format.printf(info =>{
                    // delete info.extra.muevy_transaction_id;

                    return `${info.timestamp} ${info.level}: ${info.message} ${info.extra ? JSON.stringify(info.extra) : ''}`;
                    }
                ));

            level = 'debug';

        } else {
            format = winston.format.json();
            level = 'warn';
        }

        this.logger = winston.createLogger({
          level: level,
          format: format,
        });

        this.logger.add(new winston.transports.Console({
          stderrLevels: ['error'],
          consoleWarnLevels: ['warn']
        }));

    }

    debug(msg, obj) {
        this.logger.log({
            level: 'debug',
            message: msg,
            extra: obj
        });
    }

    trace(msg, obj) {
        this.logger.log({
            level: 'debug',
            message: msg,
            extra: obj
        });
    }

    info(msg, obj) {
        this.logger.log({
            level: 'info',
            message: msg,
            extra: obj
        });
    }

    warn(msg, obj) {
        this.logger.log({
            level: 'warn',
            message: msg,
            extra: obj
        });
    }

    error(msg, obj){
        this.logger.log({
            level: 'error',
            message: msg,
            extra: obj
        });
    }

}

module.exports = new Logger();
