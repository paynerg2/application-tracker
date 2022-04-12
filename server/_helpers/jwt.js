const expressJwt = require('express-jwt');
const config = require('../config');
const userService = require('../models/users/user.service');

module.exports = jwt;

function jwt() {
    const { secret } = config;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes don't require authentication
            '/users/authenticate',
            '/users/register',
            //expressJwt.unless doesn't accept :param syntax, but it does accept RegEx
            /^\/users\/googleAuth\/.*/,
        ],
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
}
