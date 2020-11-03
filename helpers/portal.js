'use strict';
const fs = require('fs');
const path = require('path');
const portalMock = require('./mock-portaldata');
const portal = {
    /**
     * @name createPortal
     * @description create portal data js file and add PORTAL_DATA property
     * to the window object as an object
     * @param {object} data represents authorized user info
     */
    createPortal: (user) => {
        let portalData;
        if (user) {
            portalData = `window.PORTAL_DATA = {isRacker:false, userId: "${user.id}",
            username:'${user.name}', domainId: '${user['RAX-AUTH:domainId']}', tenants:['cloud:${user['RAX-AUTH:domainId']}']};`;
        }
        else {
            portalData = portalMock.data;
        }

        let dir = path.join(__dirname, '../scripts');
        // create directory if it doesn't exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        // lastly write file to path
        fs.writeFileSync(path.join(dir, 'portaldata.js'), portalData);
    }
};

module.exports = portal;
