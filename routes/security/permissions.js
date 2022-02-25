
const {AuthenticationError, AuthorizationError} = require('../../helpers/errors')
const config = require('../../config')

function isAllowed(service, action, user) {

    return true;
}

const isLoggedIn = function(req, res, next){
    if(!req.isAuthenticated){
        next(new AuthenticationError("REQUEST", "User not authenticated"))
    }
    else
        next();
}



const permit = function(args){
    return async function(req, res, next) {

        if(isAllowed(args.service, args.action, req.tokenPayload))
            next()
        else
            throw new AuthorizationError("REQUEST", "User not Authorized")
    }
}

module.exports = {isLoggedIn, permit};
