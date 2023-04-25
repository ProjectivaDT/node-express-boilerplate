  const jwt = require('jsonwebtoken');
  const config = require('../../config')

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


(function () {

  /**
   * Middleware dependencies.
   */
  'use strict';

  /**
   * JWT Parser - it adds 2 attributes into the Request object
   *
   * req.isAuthenticated: if JWT token is valid
   * req.tokenPayload: the JWT content
   *
   */

  function middlewareWrapper(o){
      // if no options were passed in, use the defaults
      if (!o || o === true) {
        o = {};
      }

      return function webtokenMiddleware(req, res, next){
        const token = new TokenService(req.headers);
        req.isAuthenticated = token.isAuthenticated();
        req.tokenPayload    = token.getPayload();

        if(req.tokenPayload){
          TokenService.createToken(req.tokenPayload, (ntoken)=>{
            res.set('authorization', 'Bearer ' + ntoken)
            next();
          })
        } else {
          next();
        }
      }
  }

  module.exports = middlewareWrapper;
}());
