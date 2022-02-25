/**
 * Module dependencies.
 */
var winston   =    require("winston");

/**
 * Module constants.
 */

const customLevels = {
 levels: {
   silly: 6,
   debug: 5,
   http: 4,
   info: 3,
   warn: 2,
   error: 1,
   fatal: 0,
 },
 colors: {
   silly: 'white',
   debug: 'green',
   http: 'blue',
   info: 'blue',
   warn: 'yellow',
   error: 'red',
   fatal: 'red'
 },
};


/**
 * Winston Formats.
 */

const consoleformat = winston.format.combine(
 winston.format.colorize(),
 winston.format.timestamp(),
 // winston.format.splat(),
  winston.format.printf((info) => {
   const { timestamp, level, message, ...meta } = info;
   var ret = `${timestamp} [${level}]: ${message} \n`
   // ret += meta.type ? String(meta.type) : '';
   // ret += meta.body ? String(meta.body) : ''
   // ret += meta.stack ? String(meta.stack) : '';
   ret += JSON.stringify(meta)
   ret += '\n';
   return  ret;
 })
);

/**
 * Check environment.
 */

function isDevEnvironment(){
  if (process.env.NODE_ENV == 'development')
    return true;
  else
    return false;
}

/**
 * Logger Class.
 */

class Logger {

 #logger;

  constructor() {
   const _production = new winston.transports.File({
     filename: 'logs/error.log',
     level: 'error',
   });

   const _console = new winston.transports.Console({
     format: consoleformat,
   });

   const _development = new winston.transports.File({
     filename: 'logs/debug.log',
     level: 'silly',
   });

   this.#logger = winston.createLogger({
     level: isDevEnvironment() ? 'silly' : 'error',
     levels: customLevels.levels,
     transports: [_production],
   });

   if(isDevEnvironment()){
    this.#logger
      .clear()
      .add(_console)
      .add(_development)
   }

   winston.addColors(customLevels.colors);
 }

 /**
 * Logger types methods
 */

 silly(msg, meta) {
   this.#logger.log('silly', msg, meta);
 }

 debug(msg, meta) {
   this.#logger.debug({message: msg, context: meta});
 }

 http(msg, meta) {
   this.#logger.log({level: 'http', message: msg, meta: meta});
 }

 info(msg, meta) {
   this.#logger.info(msg, meta);
 }

 warn(msg, meta) {
   this.#logger.warn(msg, meta);
 }

 error(msg, meta) {
   this.#logger.error(msg, meta);
 }

 fatal(msg, meta) {
   this.#logger.log('fatal', msg, meta);
 }
}

const logger = new Logger();

module.exports = logger;
