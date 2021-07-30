const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.user;

    router.post('/register/email', controller.registerByEmail);
    router.post('/login/email', controller.loginByEmail);

    app.use('/user', router);
}