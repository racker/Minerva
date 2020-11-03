'use strict';
const fs = require('fs');
const path = require('path');
const request = require('request');
const pilotMock = require('./mock-pilotdata');

let pilot = {

    /**
    * @name PilotFunction
    * @description gets the Pilot navigation header
    * @param {object} params - tenantId, token & body
    * @returns {Promise}
    */

    requestPilot: (data) => {
        let body = {
            "primary-nav": {
                "show": false
            }
        };

        return new Promise((resolve, reject) => {
            const options = {
                url: `${data.url}/cloud/${data.tenantId}/navigation?active=intelligence`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': data.token
                },
                json: body
            };

            request(options, (err, res, body) => {
                if (err || body.badRequest) {
                    reject(errr || body.badRequest);
                }
                pilot.createPilot(body);
                resolve(body);
            });
        });
    },

    /**
     * @name createPilot
     * @description create portaldata.js file where <pilot-nav> gets overwritten by
     * dummy nav or legit one
     * @param {object} data this will be the data coming from Pilot API response
     */
    createPilot: (data) => {

        var pilotData = data || pilotMock.nav;
        var pilotscript = `var pilotNav = document.querySelector('pilot-nav');
        var newPilot = document.createElement('div'); newPilot.innerHTML=\`${pilotData}\`;
        pilotNav.parentNode.replaceChild(newPilot, pilotNav);`;

        let dir = path.join(__dirname, '../scripts');
        // create directory if it doesn't exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // lastly write file to path
        fs.writeFileSync(path.join(dir, 'pilotdata.js'), pilotscript);
    }
};

module.exports = pilot;