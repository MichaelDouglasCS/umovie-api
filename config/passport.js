const config = require('config');
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;

// JWT OPTIONS
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOKEN_SECRET || config.get('authentication.tokenSecret')
};

// JWT STRATEGY
const strategy = new JWTStrategy(options, async (token, done) => {
    try {
        return done(null, token);
    } catch (error) {
        return done(error);
    }
});

module.exports = (passport) => {
    passport.use(strategy);
};