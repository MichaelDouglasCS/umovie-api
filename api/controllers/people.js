const axios = require('axios');
const config = require('config');
const queryParameters = require('../utils/queryParameters');
const controller = {};

const providerBaseURL = 'https://api.themoviedb.org/3/person';
const providerAPIKey = config.get('tmdb.apiKey');

// PERSON DETAILS
controller.getDetails = (req, res) => {
    let parameters = queryParameters.getParametersBy(req);
    let detailsRequest = axios.get(providerBaseURL + `/${req.params.id}?api_key=` + providerAPIKey + parameters);
    let creditsRequest = axios.get(providerBaseURL + `/${req.params.id}/combined_credits?api_key=` + providerAPIKey + parameters);
    let externalIDsRequest = axios.get(providerBaseURL + `/${req.params.id}/external_ids?api_key=` + providerAPIKey + parameters);

    axios.all([detailsRequest, creditsRequest, externalIDsRequest]).then(axios.spread((...responses) => {
        let details = responses[0].data;
        let credits = responses[1].data;
        let externalIDs = responses[2].data;
        res.status(200).json({
            "details": details,
            "credits": credits,
            "external_ids": externalIDs
        });
    })).catch(error => res.status(400).json(error));
};

module.exports = controller;