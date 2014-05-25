var request = require('supertest'),
	express = require('express'),
	serverAPI = require('../../server/api'),
	application = serverAPI.launch();

describe('GET /api/mail', function(){
	it('responds with ok(200)', function(done){
		request(application)
			.get('/api/mail')
			.expect('Content-Type', 'text/html; charset=utf-8')
			.expect(200, done);
	})
})

describe('POST /api/mail', function(){
	this.timeout(6000);
	it('responds with 200 on valid email request | single recipient', function(done){
		request(application)
			.post('/api/mail')
			.set('Accept', 'application/json')
			.send({
				to: [
					{ email: 'david@citizendish.com', }
				],
				from: 'David Kleriga <david@citizendish.com>',
				message: 'this is a message', 
				signature: 'dk'
			})
			.expect(200,done);
	})
	it('responds with 200 on successfull email request | multiple recipients', function(done){
		request(application)
			.post('/api/mail')
			.set('Accept', 'application/json')
			.send({
				to: [
					{ email: 'david@citizendish.com', },
					{ email: 'david@citizendish.com', },
				],
				from: 'David Kleriga <david@citizendish.com>',
				message: 'this is a message', 
				signature: 'dk'
			})
			.expect(200,done);
	})

	it('responds with 500 on incomplete request', function(done){
		request(application)
			.post('/api/mail')
			.set('Accept', 'application/json')
			.send({
				to: [ { email: 'david@citizendish.com'}],
				from: 'David Kleriga <david@citizendish.com>'
			})
			.expect(500,done);
	})

	it ('responds with 500 on invalid email input', function(done){
		request(application)
			.post('/api/mail')
			.set('Accept', 'application/json')
			.send({
				to: [ { email: 'david.com'}],
				from: 'David Kleriga <david@citizendish.com>'
			})
			.expect(500,done);
	})
})

