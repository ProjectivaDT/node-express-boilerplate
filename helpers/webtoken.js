/**
 * Module dependencies.
 */
'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config')


/**
 * Module TokenService - Used to create JSON WebToken.
 */
class TokenService {
    constructor(headers) {
        this.token      = this._extractTokenFromHeaders(headers);
        this.payload    = null;
        this.validToken = false;

        this._verifyToken();
    }

    static createToken(options, cb) {
        const payload = options
        delete payload.iat;
        delete payload.exp;
        delete payload.tokentime;
        jwt.sign(payload, config.privateKey, {
            algorithm:  "RS256",
            expiresIn: options.expireTime || '2w' // expires in 24 hours
        }, cb);
    }

    getPayload() {
        return this.payload;
    }

    isAuthenticated() {
        return this.validToken;
    }

    _verifyToken() {
        if(!this.token) return;

        try {
            this.payload    = jwt.verify(this.token, config.publicKey);
            this.validToken = true;
        } catch (err) {
            this.payload    = null;
            this.validToken = false;
        }
    }

    _extractTokenFromHeaders(headers) {
        if(!headers) return false;

        if(headers.authorization)
            return headers.authorization.replace('Bearer ', '');

        if(headers.length>0) return headers;
    }
}

module.exports = TokenService;
