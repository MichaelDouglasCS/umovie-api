const axios = require('axios');
const controller = {};

controller.movies = (_, res) => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=86edbafd587030693158039afb48e826')
        .then(response => res.json(response.data))
        .catch(err => res.json(err));
};

module.exports = controller;