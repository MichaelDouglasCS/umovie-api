const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.user;

    router.post('/register', controller.register);

    app.use('/user', router);
}