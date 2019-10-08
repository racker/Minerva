'use strict';
var path = require('path');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var browserSync = require('browser-sync');
var args = require('./arguments');
var Identity = require('./services/identity/token');
var Pilot = require('./services/pilot/index');
var Portal = require('./helpers/portal');
var PilotScript = require('./helpers/pilot');
var Api = require('./api');
var exec = require('child_process').exec;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));

// this route is reserved for all api requests used in the app
app.use('/intelligence/api', Api);

// all unmatched requests to this path, with no file extension, redirect to index
app.use('/intelligence', function ( req, res, next ) {
    // uri has a forward slash followed any number of any characters except full stops (up until the end of the string)
    if (/\/[^.]*$/.test(req.url)) {
        res.sendFile((path.join(__dirname, '../dist/intelligence/index.html')));
    } else {
        next();
    }
});

let body = {};
const port = 3000;
const env = process.env.NODE_ENV;

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

console.log(`Starting with mocked ${env} environment`);
/* -- uncomment if wanting to debug all requests --
    const request = require('request');
    require('request-debug')(request);
*/

if (env === 'dev') {

    try {
        Portal.createPortal();
        PilotScript.createPilot();
    }
    catch (e) {
        return Promise.reject(e);
    }

    CreateServer();
}
else {

// Attempt to login against Rackspace Identity
Identity.login({'body': body}).then((response) => {

    Identity.setToken(response.access.token);
    Identity.setUser(response.access.user);

    let body = {
        "primary-nav": {
            "show": false
        }
    };

    // upon login get Pilot navigation
    return Pilot({'tenantId': Identity.info().token.tenant.id, 'body': body, 'token': Identity.info().token.id });

}, breakChain).then(async (pilotResponse) => {

    try {
        Portal.createPortal(Identity.info());
        PilotScript.createPilot(pilotResponse);
        return;
    }
    catch (e) {
        return Promise.reject(e);
    }

}, breakChain).then(() => {

    CreateServer();
});
}
/**
 * @name breakChain
 * @description function breaks the chain of promises
 * @param {object} err
 * @returns Promise rejected
 */
function breakChain(err) {
    console.log('** Promise chain broken:\n ' + JSON.stringify(err));
    return Promise.reject(err);
}


/**
 * @name CreateServer
 * @description function finalizes creating the server
 */
function CreateServer() {
    // after successfully parsing and writing file to /dist folder create static site
    app.use(express.static(path.join(__dirname, '../dist')));
    var server = http.createServer(app);
    // now that the script files have been created we'll build the Angular app

    exec('npm run build-local',
    function (err, stdout, stderr) {
        if (err) {
            console.log('** Error building Angular app: ' + err);
    }
    server.listen(port, 'dev.i.rax.io', () => {
        console.log(`\n \n 🚀 listening at http://dev.i.rax.io:${port}/intelligence \n\n`);
        browserSync({
            watch: true,
            files: [
                '../dist/intelligence/*.{html,js,css}',
                '../dist/intelligence/**/*.{html,js,css}'
            ],
            host: 'dev.i.rax.io',
            open:'external',
            online: true,
            port: port,
            reloadOnRestart: true,
            proxy: 'dev.i.rax.io:' + port + '/intelligence',
            ui: false
        });
    });
}).stdout.pipe(process.stdout);;
}