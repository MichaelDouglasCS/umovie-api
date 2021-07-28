const config = require('config');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const User = require('../api/models/User');

// PASSPORT OPTIONS
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET || config.get('server.tokenSecret')
};

// CONFIGURE JWT STRATEGY
const strategy = new JWTStrategy(options, async (token, done) => {
    try {
        console.log('DEU BOM')
        return done(null, token);
    } catch (error) {
        console.log('DEU MERDA');
        console.log(process.env.TOKEN_SECRET);
        done(error);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
};