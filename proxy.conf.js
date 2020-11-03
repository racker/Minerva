
void (async function() {

  const fs = require('fs');
  const readlineSync = require('readline-sync');
  const settings = require('./config/settings.json');
  const Identity = require('./helpers/login');
  const Portal = require('./helpers/portal');
  const Pilot = require('./helpers/pilot');

  let setup = ['Staging', 'Production'];
  let envSetup = readlineSync.keyInSelect(setup, 'Choose Portal Env:');

  const identityURL = envSetup === 0
    ? settings.staging.identity
    : settings.prod.identity;

  const portalURL = envSetup === 0
    ? settings.staging.portal
    : settings.prod.portal;

  const pilotURL = envSetup === 0
    ? settings.staging.pilot
    : settings.prod.pilot

  // Ask dev for portal session id
  console.log(`for /api/ access you need a portal session.
  to get sessions ID: Copy cookie value for "__Secure-portal_sessionid"\n`);
  let portalSessionId = readlineSync.question(`Enter ${setup[envSetup]} Portal Session ID [DEFAULTS to last saved session]:`);
  if (!portalSessionId) {
    portalSessionId = fs.readFileSync('.portal-session').toString();
  } else {
    fs.writeFileSync('.portal-session', portalSessionId);
  }

  let username = readlineSync.question('\nUsername: ');
  let options = ['Password', 'APIKey'];
  let choice = readlineSync.keyInSelect(options, 'Choose login option:');
  let secret = readlineSync.question(choice === 0 ? "Password: " : "APIKey: ");

  let req = {
    url: identityURL,
    args: {
      username,
      ...(choice === 0 && { password: secret }),
      ...(choice === 1 && { apikey: secret })
    }
  };

  try {
    console.log("\n... Attempting login ....");
    const result = await Identity.login(req);
    Portal.createPortal(result.access.user);
    await Pilot.requestPilot({
      url: pilotURL, tenantId: result.access.user['RAX-AUTH:domainId'],
      token: result.access.token.id
    });
  }
  catch (e) {
    console.error(e);
    throw new Error();
  }

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

})();
