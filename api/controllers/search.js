const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerAPIKey = config.get('tmdb.apiKey');

// SEARCH RESULTS
controller.getSearchResults = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get('https://api.themoviedb.org/3/search/multi?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            let page = response.data.page;
            let totalPages = response.data.total_pages;

            let movies = response.data.results.filter((result) => result.media_type == "movie");
            let series = response.data.results.filter((result) => result.media_type == "tv");
            let people = response.data.results.filter((result) => result.media_type == "person");
            
            res.status(200).json({ "page": page, "movies": movies, "series": series, "people": people, "total_pages": totalPages });
        }).catch(error => res.status(400).json(error));
};

// SEARCH SUGGESTIONS
controller.getSuggestions = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let moviesRequest = axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=' + providerAPIKey + parameters);
    let seriesRequest = axios.get('https://api.themoviedb.org/3/trending/tv/day?api_key=' + providerAPIKey + parameters);
    let genresRequest = axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + providerAPIKey + parameters);
    let peopleRequest = axios.get('https://api.themoviedb.org/3/person/popular?api_key=' + providerAPIKey + parameters);

    axios.all([moviesRequest, seriesRequest, genresRequest, peopleRequest]).then(axios.spread((...responses) => {
        let movies = responses[0].data.results;
        let series = responses[1].data.results;
        let genres = responses[2].data.genres;
        let people = responses[3].data.results;
        res.status(200).json({
            movies: movies,
            series: series,
            genres: genres,
            people: people
        });
    })).catch(error => res.status(400).json(error));
};

module.exports = controller;