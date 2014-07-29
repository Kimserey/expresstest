/*
* routes index tests
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global describe, before, after, it*/
'use strict';

var expect = require('chai').expect,
	post = require('../models/post'),
	mongoose = require('mongoose'),
	request = require('supertest'),
	should = require('should');

describe('routes', function () {
	var id, db,
		url = 'http://localhost:3000',
		apiurl = url + '/api',
		title = 'First post',
		body = 'First post body';

	describe('/get', function () {
		it('Should return one post', function (done) {
			request(apiurl)
				.get('/posts/' + id)
				.end(function (err, res) {
					if (err) {
						throw err;
					}

					res._id.should.eql(id);
					res.title.should.equal(title);
					res.body.should.equal(body);
					done();
				});
		});
	});

	describe('/test', function () {
		it('Should return Hello World', function (done) {
			request(url)
				.get('/test')
				.end(function (err, res) {
					if (err) {
						throw err;
					}

					res.text.should.equal('Hello World');
					done();
				});
		});
	});

	before(function (done) {
		mongoose.connect('mongodb://localhost/expresstestDb_test');
		db = mongoose.connection;
		post.create(title, body, function (err, data) {
			if (err) {
				throw err;
			}

			id = data._id;		
			done();	
		});
	});

	after(function (done){
		// db.collections.posts.drop();
		done();
	});
});

