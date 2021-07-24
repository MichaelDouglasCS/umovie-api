const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.user;

    router.post('/register', controller.register);
    router.post('/login', controller.login);

    app.use('/user', router);
}