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
            res.status(200).json({ "page": page, "movies": movies, "total_pages": totalPages });
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
            res.status(200).json({ "page": page, "movies": movies, "total_pages": totalPages });
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
            res.status(200).json({ "page": page, "movies": movies, "total_pages": totalPages });
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
            res.status(200).json({ "page": page, "movies": movies, "total_pages": totalPages });
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
            res.status(200).json({ "page": page, "movies": movies, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// MOVIE DETAILS
controller.getDetails = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let region = req.query.region ?? "BR";
    let movieID = req.params.id;
    let detailsRequest = axios.get(providerBaseURL + `/${movieID}?api_key=` + providerAPIKey + parameters);
    let videosRequest = axios.get(providerBaseURL + `/${movieID}/videos?api_key=` + providerAPIKey + parameters);
    let releaseDatesRequest = axios.get(providerBaseURL + `/${movieID}/release_dates?api_key=` + providerAPIKey + parameters);
    let creditsRequest = axios.get(providerBaseURL + `/${movieID}/credits?api_key=` + providerAPIKey + parameters);
    let externalIDsRequest = axios.get(providerBaseURL + `/${movieID}/external_ids?api_key=` + providerAPIKey + parameters);
    let recommendationsRequest = axios.get(providerBaseURL + `/${movieID}/recommendations?api_key=` + providerAPIKey + parameters);
    let watchProvidersRequest = axios.get(providerBaseURL + `/${movieID}/watch/providers?api_key=` + providerAPIKey + parameters);

    axios.all([
        detailsRequest, 
        videosRequest, 
        releaseDatesRequest, 
        creditsRequest, 
        externalIDsRequest, 
        recommendationsRequest, 
        watchProvidersRequest
    ]).then(axios.spread((...responses) => {
        let details = responses[0].data;
        delete details.release_date;
        details.release_info = responses[2].data.results.filter((result) => result.iso_3166_1 == region)[0].release_dates[0];

        let videos = responses[1].data.results;
        let credits = responses[3].data;
        let externalIDs = responses[4].data;
        let recommendations = responses[5].data;
        let watchProviders = responses[6].data;
        res.status(200).json({
            "details": details,
            "videos": videos,
            "credits": credits,
            "externa_ids": externalIDs,
            "recommendations": recommendations.results,
            "watch_providers": watchProviders.results[region]
        });
    })).catch(error => res.status(400).json(error));
};

module.exports = controller;