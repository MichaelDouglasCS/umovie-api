const config = require('config');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../api/models/User');

// CONFIGURATION PASSPORT JWT
const jwtOptions = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET || config.get('server.tokenSecret')
};

const jwtStrategy = new JWTStrategy(jwtOptions, async (token, done) => {
    try {
        return done(null, token);
    } catch (error) {
        return done(error);
    }
});

// CONFIGURATION PASSPORT FACEBOOK
const facebookOptions = {
    clientID: config.get('facebook.clientID'),
    clientSecret: config.get('facebook.clientSecret'),
    callbackURL: config.get('facebook.callbackURL')
};

const facebookStrategy = new FacebookStrategy(facebookOptions, async (accessToken, refreshToken, profile, done) => {
    try {
        return done(null, profile);
    } catch (error) {
        return done(error);
    }
});

module.exports = (passport) => {
    passport.use(jwtStrategy);
    passport.use(facebookStrategy);
};