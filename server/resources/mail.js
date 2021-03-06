///<reference path='../../types/references.d.ts' />
var _ = require('underscore');

var MailBroker = require('../brokers/mandrill');

var DEFAULTS = {
    from: 'CD Mailer <mailer@citizendish.com>',
    link: 'http://www.bandwango.com',
    signature: 'Thanks, \n Bandwango'
};

function sendEmail(email) {
    return MailBroker.sendSingle(email);
}

function registerOn(server) {
    server.get('/api/mail', function (request, response) {
        response.send('ok');
    });

    server.post('/api/mail', function (request, response) {
        var email = _.extend({}, DEFAULTS, request.body);

        // console.log('received request', email);
        sendEmail(email).then(function (successMessage) {
            console.log('email sent successfully', successMessage);
            response.send(200);
        }, function (error) {
            response.send(500);
        });
    });
}
exports.registerOn = registerOn;
