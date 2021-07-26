const passport = require('passport');
const router = require('express').Router();

module.exports = app => {
    const controller = app.controllers.movies;

    router.get('/movies', passport.authenticate('jwt', { session: false }), controller.getMovies);
    
    app.use(router);
};