const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerBaseURL = 'https://api.themoviedb.org/3/tv';
const providerAPIKey = config.get('tmdb.apiKey');

// TRENDING SERIES
controller.getTrending = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ "page": page, "series": series, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// POPULAR SERIES
controller.getPopular = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/popular?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ "page": page, "series": series, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// AIRING TODAY SERIES
controller.getAiringToday = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/airing_today?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ "page": page, "series": series, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// ON AIR SERIES
controller.getOnAir = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/on_the_air?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ "page": page, "series": series, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// TOP RATED SERIES
controller.getTopRated = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/top_rated?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;
            let series = response.data.results;
            res.status(200).json({ "page": page, "series": series, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// SERIE DETAILS
controller.getDetails = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let region = req.query.region ?? "BR";
    let serieID = req.params.id;
    let detailsRequest = axios.get(providerBaseURL + `/${serieID}?api_key=` + providerAPIKey + parameters);
    let videosRequest = axios.get(providerBaseURL + `/${serieID}/videos?api_key=` + providerAPIKey + parameters);
    let creditsRequest = axios.get(providerBaseURL + `/${serieID}/credits?api_key=` + providerAPIKey + parameters);
    let externalIDsRequest = axios.get(providerBaseURL + `/${serieID}/external_ids?api_key=` + providerAPIKey + parameters);
    let recommendationsRequest = axios.get(providerBaseURL + `/${serieID}/recommendations?api_key=` + providerAPIKey + parameters);
    let watchProvidersRequest = axios.get(providerBaseURL + `/${serieID}/watch/providers?api_key=` + providerAPIKey + parameters);

    axios.all([
        detailsRequest, 
        videosRequest, 
        creditsRequest, 
        externalIDsRequest, 
        recommendationsRequest, 
        watchProvidersRequest
    ]).then(axios.spread((...responses) => {
        let details = responses[0].data;
        let videos = responses[1].data.results;
        let credits = responses[2].data;
        let externalIDs = responses[3].data;
        let recommendations = responses[4].data;
        let watchProviders = responses[5].data;
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

// SEASON DETAILS
controller.getSeasonDetails = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let serieID = req.params.id;
    let seasonID = req.params.seasonID;
    axios.get(providerBaseURL + `/${serieID}/season/${seasonID}?api_key=` + providerAPIKey + parameters)
        .then((response) => {
            res.status(200).json(response.data);
        }).catch(error => res.status(400).json(error));
};

// EPISODE DETAILS
controller.getEpisodeDetails = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let serieID = req.params.id;
    let seasonID = req.params.seasonID;
    let episodeID = req.params.episodeID;
    axios.get(providerBaseURL + `/${serieID}/season/${seasonID}/episode/${episodeID}?api_key=` + providerAPIKey + parameters)
        .then((response) => {
            res.status(200).json(response.data);
        }).catch(error => res.status(400).json(error));
};

module.exports = controller;