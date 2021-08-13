const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerBaseURL = 'https://api.themoviedb.org/3';
const providerAPIKey = config.get('tmdb.apiKey');

// API CONFIGURATIONS
controller.getConfigurations = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    axios.get(providerBaseURL + '/configuration?api_key=' + providerAPIKey + parameters)
        .then((response) => {
            res.status(200).json(response.data);
        }).catch(error => res.status(400).json(error));
};

module.exports = controller;