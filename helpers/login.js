'use strict';
const request = require('request');

var Authenticate = {};

/**
 * @name Authenticate
 * @description used to validate user and get auth token
 * @param {object} req
 * @param {object} response
 * @param {function} next
 * @return {Promise}
 */
Authenticate.login = function(req) {
    let url = req.url;
    let args = req.args;

    /** Can be added when /api/identity opens up
        const j = request.jar();
        const cookieValue = request.cookie(`__Secure-portal_sessionid=${cookie}`)
        j.setCookie(cookieValue, url);
    */

    let body = "";
    if (args.apikey) {
        body = {
            auth: {
                'RAX-KSKEY:apiKeyCredentials': {
                    username: args.username,
                    apiKey: args.apikey
                }
            }
        };
    }
    else {
        body = {
            auth: {
                passwordCredentials: {
                    username: args.username,
                    password: args.password
                }
            }
        };
    }

    return new Promise((resolve, reject) => {
        const options = {
            url: `${url}/tokens`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            json: body
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

