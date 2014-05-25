///<reference path='../../types/references.d.ts' />
var _ = require('underscore');
var $q = require('q');

var credentials = { key: 'dEN3skC-tOl70S0zmy6ksg' }, powerdrill = require('powerdrill'), EmailBuilder = powerdrill(credentials.key);

var copyAdmin = 'david@citizendish.com';

function sendSingle(email, templateKey) {
    if (typeof templateKey === "undefined") { templateKey = 'bandwango'; }
    var sendEmail = $q.defer(), fluentEmail = EmailBuilder(templateKey);

    if (_.isEmpty(email.message)) {
        sendEmail.reject('cannot be sent without message');
    } else {
        _.each(email.to, function (contact) {
            fluentEmail.to(contact.email);
        });

        fluentEmail.subject(email.subject).from(email.from).globalMergeVar({ message: email.message }).globalMergeVar({ link: email.link }).globalMergeVar({ signature: email.signature }).send(function (error, response) {
            if (error || response[0].status == 'invalid') {
                // console.error('send failed', error, response);
                sendEmail.reject(error);
            } else {
                // console.log('send complete', response);
                sendEmail.resolve(response);
            }
        });
    }

    return sendEmail.promise;
}
exports.sendSingle = sendSingle;
