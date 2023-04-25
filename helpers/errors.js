class BaseError extends Error {
    constructor(error) {
        super(error.message);
        this.statusCode = error.statusCode;
        this.errorMethod = error.method;
        this.details = error.details;
        this.timestamp = new Date().getTime();
    }

    toString() {
        return `${this.timestamp} - errorcode: ${this.statusCode} - message: ${this.message} - details: ${this.details}`;
    }

    toJSON() {
        return {
            timestamp: this.timestamp,
            errorMethod: this.errorMethod,
            errorCode: this.errorCode,
            details: this.details,
            message: this.message,
        };
    }
}


class SecurityError extends BaseError {
    constructor(error) {
        super(error);
        this.errorType = "Security Error";
        this.errorCode = error.errorCode || 403;
    }
}

class DataAccessError extends BaseError {
    constructor(error) {
        super(error);
        this.errorType = "Data Access Error";
        this.errorCode = error.errorCode || 403;
    }
}

class BadRequestError extends BaseError {
    constructor(error) {
        super(error);
        this.errorType = "Bad Request Error";
        this.errorCode = error.errorCode || 400;
    }
}

class RequestError extends BaseError {
    constructor(error) {
        super(error);
        this.errorType = "Request Error";
        this.errorCode = error.errorCode || 500;
    }
}

class AuthenticationError extends BaseError {
    constructor(error) {
        super(error);
        this.errorType = "Authentication Error";
        this.errorCode = error.errorCode || 403;
    }
}

class AuthorizationError extends BaseError {
    constructor(error) {
        super(error);
        this.errorType = "Authorization Error";
        this.errorCode = error.errorCode || 403;
    }
}

module.exports = {
    BaseError,
    SecurityError,
    RequestError,
    BadRequestError,
    DataAccessError,
    AuthenticationError,
    AuthorizationError
};
