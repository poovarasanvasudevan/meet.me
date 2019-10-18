const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const {default: ParseServer, ParseGraphQLServer} = require('parse-server');
const ParseDashboard = require('parse-dashboard');
const FSFilesAdapter = require('@parse/fs-files-adapter');
const ioServer = require('socket.io');
const RTCMultiConnectionServer = require('rtcmulticonnection-server');
var ParseSwagger = require('parse-server-swagger');
const statusMonitor = require('express-status-monitor')();

var http = require('http');


const app = express();
app.use(compression());
app.use(helmet());
app.use(statusMonitor);

app.get('/server-status', statusMonitor.pageRoute);
app.set('trust proxy', true);


app.use(function (req, res, next) {
    req.headers['x-real-ip'] = req.ip;
    next();
});

// app.use(function (req, res, next) {
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     next();
// });


const api = new ParseServer({
    databaseURI: 'mongodb://localhost:27017/meet', // Connection string for your MongoDB database
    cloud: './cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    javascriptKey: 'jskey',
    serverURL: 'http://localhost:3001/parse',
    accountLockout: {
        duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
        threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
    },
    passwordPolicy: {
        maxPasswordAge: 90,
        maxPasswordHistory: 5,
    },
    liveQuery: {
        classNames: [
            'User',
            'QRLogin'
        ]
    }
});


const parseGraphQLServer = new ParseGraphQLServer(
    api,
    {
        graphQLPath: '/graphql',
        playgroundPath: '/playground'
    }
);
var options = {allowInsecureHTTP: true};

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:3001/parse",
            "appId": "myAppId",
            "masterKey": "myMasterKey",
            "appName": "MyApp",
            "javascriptKey": "jskey",
            "graphQLServerURL": "http://localhost:3001/graphql",
        }
    ]
}, options);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api.app);
app.use('/dashboard', dashboard);
parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
parseGraphQLServer.applyPlayground(app); // (Optional) Mounts the GraphQL Playground - do NOT use in Production


var parseSwagger = new ParseSwagger({
    host: 'http://localhost:3001',
    apiRoot: '/parse',
    appId: 'myAppId',
    masterKey: 'myMasterKey',
});

app.use(parseSwagger);

app.get('/avatar', async function (req, res) {
    // console.log(req.query.text);
    //
    // const avatar = new AvatarGenerator({
    //     imageExtension: '.png' // sprite file extension
    // });
    // const variant = 'male';
    // const image = await avatar.generate(req.query.text, variant);
    // image
    //     .pipe(res);

});
app.get("/", function (req, res) {
    res.send("Hello");
});


var server = http.createServer(app);
ioServer(server).on('connection', function (socket) {
    RTCMultiConnectionServer.addSocket(socket, {
        config: {
            "socketURL": "/",
            "socketMessageEvent": "RTCMultiConnection-Message",
            "socketCustomEvent": "RTCMultiConnection-Custom-Message",
            "port": "3001",
        },
        logs: 'logs.json'
    });
});

server.listen(process.env.APP_PORT || 3001, '0.0.0.0', function () {
    console.log("App server started");
});

var parseLiveQueryServer = ParseServer.createLiveQueryServer(server);
