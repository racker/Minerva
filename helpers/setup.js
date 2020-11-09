void (async function() {

    const fs = require('fs');
    const readlineSync = require('readline-sync');
    const settings = require('../config/settings.json');
    const Identity = require('./login');
    const Portal = require('./portal');
    const Pilot = require('./pilot');
    const exec = require('child_process').exec;


    let setup = ['Staging', 'Production'];
    let envSetup = readlineSync.keyInSelect(setup, 'Choose Portal Env:');

    const identityURL = envSetup === 0
      ? settings.staging.identity
      : settings.prod.identity;

    const pilotURL = envSetup === 0
      ? settings.staging.pilot
      : settings.prod.pilot

    const portalURL = envSetup === 0
      ? settings.staging.portal
      : settings.prod.portal;

    // Ask dev for portal session id
    console.log(`for /api/ access you need a portal session.
    to get sessions ID: ${portalURL}racker copy cookie value for "__Secure-portal_sessionid"\n`);
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

        exec(`ng serve -c ${envSetup === 0 ? 'local-staging' : 'local-prod'} --public-host dev.i.rax.io --base-href /intelligence -o`,
            function (err) {
                if (err) {
                    console.log('** Error building Angular app: ' + err);
                }
            }).stdout.pipe(process.stdout);

    }
    catch (e) {
        console.error(e);
        throw new Error();
    }

  })();
