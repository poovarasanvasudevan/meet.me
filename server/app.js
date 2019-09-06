const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
var FSFilesAdapter = require('@parse/fs-files-adapter');

const app = express();
app.use(compression());
app.use(helmet());

var fsAdapter = new FSFilesAdapter({
    "filesSubDirectory": "./files" // optional
});
const api = new ParseServer({
    databaseURI: 'postgres://postgres:poosan@localhost:5432/meet', // Connection string for your MongoDB database
    cloud: './cloud/main.js', // Absolute path to your Cloud Code
    appId: 'myAppId',
    masterKey: 'myMasterKey', // Keep this key secret!
    fileKey: 'optionalFileKey',
    javascriptKey: 'jskey',
    filesAdapter: fsAdapter,
    serverURL: 'http://localhost:3001/parse' // Don't forget to change to https if needed
});


var options = { allowInsecureHTTP: true };

const dashboard = new ParseDashboard({
    "apps": [
        {
            "serverURL": "http://localhost:3001/parse",
            "appId": "myAppId",
            "masterKey": "myMasterKey",
            "appName": "MyApp",
            "javascriptKey": "jskey"
        }
    ]
},options);

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);
app.use('/dashboard', dashboard);


app.get("/", function (req, res) {
    res.send("Hello");
});

app.listen(process.env.APP_PORT || 3001, function () {
    console.log("App server started");
});
