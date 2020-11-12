var express = require('express');
var axios = require('axios');
var router = express.Router();
var Settings = require('../config/index');
var Identity = require('../services/identity/token');
const config = new Settings();

router.get(`/bound-monitors`, (req, res) =>{
    let queryParam = Object.keys(req.query).map((key) => key + "=" + req.query[key]).join('&');
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/bound-monitors?${queryParam}`,
    {
        headers: { 'x-auth-token': Identity.info().token.id }
    }
    ).then((result) =>{
        res.send(result.data);
    })
    .catch((err) =>{
        res.sendStatus(parseInt(err.response.status)).json(err);
    })
});

router.get('/', (req, res) => {
    let page = req.query.page;
    let size = req.query.size;
    let sort = req.query.sort;
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors`, {
        params: {
            size,
            page,
            sort
        },
        headers: { 'x-auth-token': Identity.info().token.id }

    }).then((data) => {
        res.send(data.data);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors/${id}`, {
        headers: { 'x-auth-token': Identity.info().token.id }
    }).then((data) => {
        res.send(data.data);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    axios.delete(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors/${id}`,
    {
        headers: { 'x-auth-token': Identity.info().token.id }
    }).then((data) => {
        res.sendStatus(data.status);
    })
    .catch((err) => {
        res.sendStatus(parseInt(err.response.status)).json(err);
    });
});

router.post('/', (req, res) => {
    let monitor = req.body;
    axios.post(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors`,
        monitor, { headers: { 'x-auth-token': Identity.info().token.id } })
        .then((data) => {
            res.status(data.status).json(data.data);
        })
        .catch((err) => {
            res.sendStatus(parseInt(err.response.status)).json(err);
        });
});

router.patch('/:id', (req, res) => {
    let monitor = req.body;
    let id = req.params.id
    axios.patch(`${config.monitoring.api_host}${config.monitoring.api_url}/${Identity.info().token.tenant.id}/monitors/${id}`,
        monitor, { headers: { 'x-auth-token': Identity.info().token.id,
        'Content-Type': 'application/json-patch+json'
    } })
        .then((data) => {
            res.status(data.status).json(data.data);
        })
        .catch((err) => {
            res.sendStatus(parseInt(err.response.status)).json(err);
        });
});





module.exports = router;
