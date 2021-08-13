const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.configurations;

    router.get('/', controller.getConfigurations);
    
    app.use('/configurations', router);
};