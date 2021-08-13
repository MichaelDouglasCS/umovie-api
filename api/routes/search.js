const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.search;

    router.get('/', controller.getSearchResults);
    router.get('/suggestions', controller.getSuggestions);
    
    app.use('/search', router);
};