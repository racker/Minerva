
'use strict';
const request = require('request');
const Settings = require('../../config/index');

const config = new Settings();
var _authInfo = {};
var Authenticate = {};

Authenticate.info = function() {
    return _authInfo;
};

Authenticate.setToken = function(token) {
    _authInfo.token = token;
};

Authenticate.setUser = function(user) {
    _authInfo.user = user;
};

/**
 * @name Authenticate
 * @description used to validate user and get auth token
 * @param {object} req
 * @param {object} response
 * @param {function} next
 * @return {Promise}
 */
Authenticate.login = function(req, response, next) {
    return new Promise((resolve, reject) => {
        const options = {
            url: config.identity + '/tokens',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: req.body
        };

        request(options, (err, res, body) => {
            if (err || body.badRequest) {
                reject(err || body.badRequest);

            }
            resolve(body);
        });
    });
}


module.exports = Authenticate;

