  const fs = require('fs');
  const settings = require('./config/settings.json');

  const portalURL = settings.staging.portal;
  let headerObj = JSON.parse(fs.readFileSync('.portal-session.json'));

  const PROXY_CONFIG = {
    "/api/*": {
      "target": portalURL,
      changeOrigin: true,
      "secure": false,
      "logLevel": "debug",
      "onProxyReq": function (proxyReq) {
        proxyReq.setHeader('Cookie', `__Secure-portal_sessionid=${headerObj.portalSessionId}`);
        proxyReq.setHeader('Referer', `https://staging.portal.rackspace.com/${headerObj.tenantId}/intelligence`)
      }
    },
  };

  module.exports = PROXY_CONFIG;