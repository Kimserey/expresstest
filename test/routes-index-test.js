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

describe('routes', function () {
	var post = require('../models/post')('mongodb://localhost/expresstestDb_test'),
		mongoose = require('mongoose'),
		request = require('supertest'),
		should = require('should'),
		url = 'http://localhost:3000',
		apiurl = url + '/api',
		title = 'First post',
		body = 'First post body',
		id, db, createPosts;

	describe('/get #/posts/:id #/posts', function () {
		it('Should return one post', function (done) {
			request(apiurl)
				.get('/posts/' + id)
				.expect(200)
				.expect(function (res) {
					res.body._id.toString().should.eql(id.toString());
					res.body.title.should.equal(title);
					res.body.body.should.equal(body);
				})
				.end(done);
		});

		it('Should return a list', function (done) {
			request(apiurl)
				.get('/posts/')
				.expect(200)
				.expect(function (res) {
					res.body.length.should.equal(5);
				})
				.end(done);
		});
	});

	describe('/post #/posts', function () {
		it('Should create one post', function (done) {
			var postToCreate = {
				title : 'Created post',
				body : 'Created post body'
			};

			request(apiurl)
				.post('/posts/')
				.send(postToCreate)
				.expect(201)
				.expect(function (res) {
					res.body.should.have.property('_id');
					res.body.title.should.equal(postToCreate.title);
					res.body.body.should.equal(postToCreate.body);
				})
				.end(done);
		});
	});

	describe('/test', function () {
		it('Should return Hello World', function (done) {
			request(url)
				.get('/test')
				.expect(200)
				.expect(function (res) {
					res.text.should.equal('Hello World');
				})
				.end(done);
		});
	});

	before(function (done) {
		db = mongoose.connection;
		createPosts(done);
	});

	createPosts = function (done) {
		(function create (count) {
			if (count === 5) {
				return done();
			}

			post.create(title, body, function (err, data) {
				id = data._id;
				count += 1;
				create(count);
			});	
		}(0));
	};

	after(function (done){
		db.collections.posts.drop();
		db.close();
		done();
	});
});

