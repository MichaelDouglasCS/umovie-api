
module.exports = app => {
    const movies = app.data.movies;
    const controller = {};

    controller.listCustomerWallets = (req, res) => res.status(200).json(movies);

    return controller;
}