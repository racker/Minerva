var express = require('express');
var path = require('path');
var axios = require('axios');
var router = express.Router();
var devEnv = process.env.NODE_ENV === 'dev';
const Settings = require('../config/index');
var Identity = require('../services/identity/token');
var mockPath = path.join(__dirname, '../../src/app/_mocks');

const config = new Settings();
const authToken = {
    'x-auth-token': Identity.info().token.id
};

router.get('/resources', (req, res) => {
    let page = req.query.page;
    let size = req.query.size;

    if (devEnv) {
        const data = require(`${mockPath}/resources/collection.json`);
        res.json(data);
    }
    else {
        axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources`, {
            params: {
                size,
                page
            },
            authToken
        })
        .then((data) => {
            res.send(data.data);
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
    }
});


router.get('/resources/:id', (req, res) => {
    if (devEnv) {
        const data = require(`${mockPath}/resources/single.json`);
        res.json(data);
    }
    else {
        axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/resources/${id}`, {
            authToken
        })
        .then((data) => {
            res.send(data.data);
        })
        .catch((err) => {
            res.sendStatus(500).json(err);
        });
    }

});


module.exports = router;
