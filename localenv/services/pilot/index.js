'use strict';
const request = require('request');
const Settings = require('../../config/index');

const config = new Settings();

/**
 * @name PilotFunction
 * @description gets the Pilot navigation header
 * @param {object} params - tenantId, token & body
 * @returns {Promise}
 */

function PilotFunction(params) {
    return new Promise((resolve, reject)  => {
        const options = {
            url: config.pilot + '/cloud/' + params.tenantId + '/navigation?active=intelligence',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth-Token': params.token
            },
            json: params.body
        };

        request(options, (err, res, body) => {
            if (err || body.badRequest) {
                reject(errr || body.badRequest);
            }
            resolve(body);
        });
    });
}


module.exports = PilotFunction;
