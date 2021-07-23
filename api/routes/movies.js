module.exports = app => {
    const controller = app.controllers.movies;
    app.route('/movies').get(controller.getMovies);
}