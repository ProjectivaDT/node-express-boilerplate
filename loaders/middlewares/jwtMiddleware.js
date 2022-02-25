(function () {

  /**
   * Middleware dependencies.
   */
  'use strict';
  const jwt = require('jsonwebtoken');
  const webtoken = require('../../helpers/webtoken.js')

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
        const token = new webtoken(req.headers);
        req.isAuthenticated = token.isAuthenticated();
        req.tokenPayload    = token.getPayload();

        if(req.tokenPayload){
          webtoken.createToken(req.tokenPayload, (ntoken)=>{
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
