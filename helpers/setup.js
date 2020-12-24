void (async function() {

    const fs = require('fs');
    const readlineSync = require('readline-sync');
    const settings = require('../config/settings.json');
    const Identity = require('./login');
    const Portal = require('./portal');
    const Pilot = require('./pilot');
    const exec = require('child_process').exec;
    let headerObj = {};
    let options = ['Password', 'APIKey'];
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
      try{
        headerObj = JSON.parse(fs.readFileSync('.portal-session.json'));
        console.log(headerObj);
      }catch(err){
        console.log("Please enter __Secure-portal_sessionid... ");
        return;
      }
      
    } else {
      headerObj.portalSessionId = portalSessionId;
      headerObj.username = readlineSync.question('\nUsername: ');
      headerObj.choice = readlineSync.keyInSelect(options, 'Choose login option:');
      headerObj.secret = readlineSync.question(headerObj.choice === 0 ? "Password: " : "APIKey: ");
    }

    

    let req = {
      url: identityURL,
      args: {
        username:headerObj.username,
        ...(headerObj.choice === 0 && { password: headerObj.secret }),
        ...(headerObj.choice === 1 && { apikey: headerObj.secret })
      }
    };

    try {
        console.log("\n... Attempting login ....");
        const result = await Identity.login(req);
        Portal.createPortal(result.access.user);
        if(!headerObj.tenantId){
          headerObj.tenantId = result.access.user['RAX-AUTH:domainId'];
        }
        
        
        await Pilot.requestPilot({
            url: pilotURL, tenantId: result.access.user['RAX-AUTH:domainId'],
            token: result.access.token.id
        });
        fs.writeFileSync('.portal-session.json', JSON.stringify(headerObj));
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
