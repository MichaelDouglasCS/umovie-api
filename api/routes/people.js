const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.people;

    router.get('/:id', controller.getDetails);
    
    app.use('/people', router);
};