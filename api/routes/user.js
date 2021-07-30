const passport = require('passport');
const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.user;

    router.post('/register', controller.register);
    router.post('/login', controller.login);

    router.get('/facebook', passport.authenticate("facebook", { scope: ["public_profile", "email", "user_birthday"] }));
    router.get('/facebook/callback', controller.facebook);

    app.use('/user', router);
}