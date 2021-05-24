const axios = require('axios');

const api = axios.create({
    baseURL: 'http://192.168.42.140:3000'
});

module.exports = api