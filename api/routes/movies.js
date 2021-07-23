module.exports = app => {
    const controller = app.controllers.movies;

    app.route('/api/v1/movies')
        .get(controller.listCustomerWallets);
}