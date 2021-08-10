const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.movies;

    router.get('/trending', controller.getTrending);
    router.get('/popular', controller.getPopular);
    router.get('/now-playing', controller.getNowPlaying);
    router.get('/upcoming', controller.getUpcoming);
    router.get('/top-rated', controller.getTopRated);

    router.get('/:id', controller.getDetails);
    
    app.use('/movies', router);
};