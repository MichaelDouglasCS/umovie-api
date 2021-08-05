const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerBaseURL = 'https://api.themoviedb.org/3/tv'
const providerAPIKey = config.get('tmdb.apiKey');

// POPULAR SERIES
controller.getPopular = (req, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/popular?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ page: page, series: series, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// AIRING TODAY SERIES
controller.getAiringToday = (req, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/airing_today?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ page: page, series: series, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// ON AIR SERIES
controller.getOnAir = (req, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/on_the_air?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ page: page, series: series, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// TOP RATED SERIES
controller.getTopRated = (req, res) => {
    let parameters = queryParameters.getByRequest(req);
    axios.get(providerBaseURL + '/top_rated?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ page: page, series: series, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

module.exports = controller;