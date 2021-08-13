const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.series;

    router.get('/trending', controller.getTrending);
    router.get('/popular', controller.getPopular);
    router.get('/airing-today', controller.getAiringToday);
    router.get('/on-air', controller.getOnAir);
    router.get('/top-rated', controller.getTopRated);

    router.get('/:id', controller.getDetails);
    router.get('/:id/season/:seasonID', controller.getSeasonDetails);
    router.get('/:id/season/:seasonID/episode/:episodeID', controller.getEpisodeDetails);
    
    app.use('/series', router);
};