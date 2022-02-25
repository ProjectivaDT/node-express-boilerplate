/**
 * Module Constants.
 */
const HttpStatusCode = {
 OK: 200,
 BAD_REQUEST: 400,
 UNAUTHORIZED: 401,
 FORBIDDEN: 403,
 NOT_FOUND: 404,
 INTERNAL_SERVER: 500,
 SERVICE_UNAVAILABLE: 503
}

/**
 * Class BaseError
 */

class BaseError extends Error {
 service;
 httpCode;
 isOperational;
 body;
 route;

 constructor(service, message, body, route, httpCode, isOperational) {
   super(message);
   Object.setPrototypeOf(this, new.target.prototype);

   this.body = body;
   this.service = service;
   this.httpCode = httpCode;
   this.isOperational = isOperational;
   this.route = route;

   Error.captureStackTrace(this);
 }
}

/**
 * Classes Error Types - Extends BaseError.
 */

class AuthenticationError extends BaseError {
 constructor(service, message = 'Not authenticated user', body, route, httpCode = HttpStatusCode.UNAUTHORIZED, isOperational = true) {
   super(service,message, body, route, httpCode, isOperational);
 }
}

class AuthorizationError extends BaseError {
 constructor(service, message = 'Not authorized user', body, route, httpCode = HttpStatusCode.FORBIDDEN, isOperational = true) {
   super(service,message, body, route, httpCode, isOperational);
 }
}

class BadRequestError extends BaseError {
 constructor(service, message = 'Missing or wrong parameters', body, route, httpCode = HttpStatusCode.BAD_REQUEST, isOperational = true) {
   super(service,message, body, route, httpCode, isOperational);
 }
}

class MissingHeaderError extends BaseError {
 constructor(service, message = 'Missing Header', body, route, httpCode = HttpStatusCode.BAD_REQUEST, isOperational = true) {
   super(service,message, body, route, httpCode, isOperational);
 }
}

class AppVersionError extends BaseError {
 constructor(service, message = 'Missing Header', body, route, httpCode = HttpStatusCode.BAD_REQUEST, isOperational = true) {
   super(service,message, body, route, httpCode, isOperational);
 }
}

class MaintenanceError extends BaseError {
 constructor(service, message = 'System under maintenance', body, route, httpCode = HttpStatusCode.SERVICE_UNAVAILABLE, isOperational = true) {
   super(service,message, body, route, httpCode, isOperational);
 }
}

module.exports = {BaseError, AuthenticationError, AuthorizationError, BadRequestError,MissingHeaderError,AppVersionError,MaintenanceError};
