
var express = require('express');
var axios = require('axios');
var router = express.Router();
const Settings = require('../config/index');
var identity = require('../services/identity/token');
const config = new Settings();

router.post('', (req, res) => {
  let event = req.body;
  axios.post(`${config.monitoring.api_host}${config.monitoring.api_url}/${identity.info().token.tenant.id}/event-tasks`,
    event, {
      headers: {
        'x-auth-token': identity.info().token.id
      }
    }
  ).
  then((data) => {
    res.status(data.status).json(data.data)
  }).
  catch((err) => {
    res.sendStatus(parseInt(err.response.status)).json(err);
  })
});


router.get('', (req, res) => {
  let page = req.query.page;
  axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${identity.info().token.tenant.id}/event-tasks`,
     {
      params:{
        page
      },
      headers: {
        'x-auth-token': identity.info().token.id
      }
    }
  ).
  then((data) => {
    res.status(data.status).json(data.data)
  }).
  catch((err) => {
    res.sendStatus(parseInt(err.response.status)).json(err);
  })
})
router.get('/:id', (req, res) => {
  let id = req.params.id;
  axios.get(`${config.monitoring.api_host}${config.monitoring.api_url}/${identity.info().token.tenant.id}/event-tasks/${id}`,
    {
      headers: {
        'x-auth-token': identity.info().token.id
      }
    }
  ).
  then((data) => {
    res.status(data.status).json(data.data)
  }).
  catch((err) => {
    res.sendStatus(parseInt(err.response.status)).json(err);
  })
})
module.exports = router;

