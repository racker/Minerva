
const fs = require('fs');
const readlineSync = require('readline-sync');

const PORTAL_URL = 'https://staging.portal.rackspace.com/';
// Ask dev for portal session id
console.log(`for /api/ access you need a portal session.
to get sessions ID: ${PORTAL_URL}racker Copy cookie value for "__Secure-portal_sessionid"`);
let portalSessionId = readlineSync.question('Enter Portal Session ID [DEFAULTS to last saved session]:');
if (!portalSessionId) {
  portalSessionId = fs.readFileSync('.portal-session').toString();
} else {
  fs.writeFileSync('.portal-session', portalSessionId);
}
const PROXY_CONFIG = {
  "/api/*": {
      "target": PORTAL_URL,
      changeOrigin: true,
      "secure": false,
      "logLevel": "debug",
      "onProxyReq": function(proxyReq) {
        proxyReq.setHeader('Cookie', `__Secure-portal_sessionid=${portalSessionId}`);

      }

    },
};

module.exports = PROXY_CONFIG;