const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.series;

    router.get('/popular', controller.getPopular);
    router.get('/airing-today', controller.getAiringToday);
    router.get('/on-air', controller.getOnAir);
    router.get('/top-rated', controller.getTopRated);
    
    app.use('/series', router);
};