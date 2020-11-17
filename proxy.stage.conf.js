  const fs = require('fs');
  const settings = require('./config/settings.json');

  const portalURL = settings.staging.portal;
  let portalSessionId = fs.readFileSync('.portal-session').toString();

  const PROXY_CONFIG = {
    "/api/*": {
      "target": portalURL,
      changeOrigin: true,
      "secure": false,
      "logLevel": "debug",
      "onProxyReq": function (proxyReq) {
        proxyReq.setHeader('Cookie', `__Secure-portal_sessionid=${portalSessionId}`);
      }
    },
  };

  module.exports = PROXY_CONFIG;
