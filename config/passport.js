const config = require('config');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../api/models/User');

// PASSPORT OPTIONS
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY || config.get('server.secretKey')
};

// CONFIGURE JWT STRATEGY
const strategy = new JWTStrategy(options, async (token, done) => {
    try {
        return done(null, token);
    } catch (error) {
        done(error);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
};