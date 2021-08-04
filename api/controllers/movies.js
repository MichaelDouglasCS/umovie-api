const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerBaseURL = 'https://api.themoviedb.org/3/movie'
const providerAPIKey = config.get('tmdb.apiKey');

// POPULAR MOVIES
controller.getPopular = (req, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/popular?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// NOW PLAYING MOVIES
controller.getNowPlaying = (_, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/now_playing?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// UPCOMING MOVIES
controller.getUpcoming = (_, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/upcoming?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// TOP RATED MOVIES
controller.getTopRated = (_, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/top_rated?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

module.exports = controller;