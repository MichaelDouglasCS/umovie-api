const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerBaseURL = 'https://api.themoviedb.org/3/movie';
const providerAPIKey = config.get('tmdb.apiKey');

// TRENDING MOVIES
controller.getTrending = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// POPULAR MOVIES
controller.getPopular = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/popular?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// NOW PLAYING MOVIES
controller.getNowPlaying = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/now_playing?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// UPCOMING MOVIES
controller.getUpcoming = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/upcoming?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// TOP RATED MOVIES
controller.getTopRated = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/top_rated?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let movies = response.data.results;
            res.status(200).json({ page: page, movies: movies, totalPages: totalPages });
        }).catch(error => res.status(400).json(error));
};

// MOVIE DETAILS
controller.getDetails = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let detailsRequest = axios.get(providerBaseURL + `/${req.params.id}?api_key=` + providerAPIKey + parameters);
    let creditsRequest = axios.get(providerBaseURL + `/${req.params.id}/credits?api_key=` + providerAPIKey + parameters);
    let externalIDsRequest = axios.get(providerBaseURL + `/${req.params.id}/external_ids?api_key=` + providerAPIKey + parameters);
    let recommendationsRequest = axios.get(providerBaseURL + `/${req.params.id}/recommendations?api_key=` + providerAPIKey + parameters);
    let watchProvidersRequest = axios.get(providerBaseURL + `/${req.params.id}/watch/providers?api_key=` + providerAPIKey + parameters);

    axios.all([detailsRequest, creditsRequest, externalIDsRequest, recommendationsRequest, watchProvidersRequest]).then(axios.spread((...responses) => {
        let details = responses[0];
        let credits = responses[1];
        let externalIDs = responses[2];
        let recommendations = responses[3];
        let watchProviders = responses[4];
        res.status(200).json({
            details: details.data,
            credits: credits.data,
            externalIDs: externalIDs.data,
            recommendations: recommendations.data,
            watchProviders: watchProviders.data
        });
    })).catch(error => res.status(400).json(error));
};

module.exports = controller;