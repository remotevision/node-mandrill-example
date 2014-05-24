///<reference path='../types/references.d.ts' />
var PORT = process.env.PORT || 3000;

var express = require('express');
var _ = require('underscore');

var http = require('http');

var connect = require('connect'), path = require('path');

// browserify = require('browserify-middleware');
function setupApplicationOnServer(application, server) {
    application.use(connect.static(path.join(__dirname, '..', 'client')));
    application.use(connect.bodyParser({ limit: '20mb' }));

    server.listen(PORT, function () {
        console.log('listening on port - ', PORT);
    });

    attachFramework(application);
    registerClient(application);
}

function attachFramework(application) {
    var resources = ['mail'];

    _.each(resources, function (resourceName) {
        var resource = require('./resources/' + resourceName);
        resource.registerOn(application);
    });
}

function registerClient(application) {
}

function launch() {
    console.log('launching server');
    var application = express(), httpServer = http.createServer(application);

    setupApplicationOnServer(application, httpServer);
    return application;
}
exports.launch = launch;

if (module == require.main) {
    exports.launch();
}
