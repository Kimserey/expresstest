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
		testPost = { id : "", title : 'First post', body: 'First body' }, 
		db, createPosts;

	describe('#GET /posts/:id', function () {
		it('Should return post', function (done) {
			request(apiurl)
				.get('/posts/' + testPost.id)
				.expect(200)
				.expect(function (res) {
					res.body._id.toString().should.eql(testPost.id.toString());
					res.body.title.should.equal(testPost.title);
					res.body.body.should.equal(testPost.body);
				})
				.end(done);
		});
	});

	describe('#GET /posts/', function () {
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

	describe('#POST /posts', function () {
		it('Should create post', function (done) {
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

	describe('#PUT /posts non-existing post', function () {
		it('Should return 404', function (done) {
			request(apiurl)
				.put('/posts/')
				.send({
					id : 'crapid',
					title : 'Modified post',
					body : 'Modified body'
				})
				.expect(404)
				.end(done);
		});
	});

	describe('#PUT /posts existing post', function () {
		it('Should modifiy post', function (done) {
			request(apiurl)
				.put('/posts/')
				.send({
					id : testPost.id,
					title : 'Modified post',
					body : 'Modified body'
				})
				.expect(200)
				.expect(function (res) {
					res.body.title.should.equal('Modified post');
					res.body.body.should.equal('Modified body');	
				})
				.end(done);
		});

		after(function(done) {
			post.update(testPost.id, testPost, function (err, data) {
				done(); 
			}); 
		});
	});

	describe('#DELETE /posts non-existing post', function () {
		it('Should return 404', function (done) {
			request(apiurl)
				.delete('/posts/')
				.send({ id : "crapid"})
				.expect(404)
				.end(done);
		});
	});

	describe('#DELETE /posts existing post', function () {
		it('Should delete and return the deleted post', function (done) {
			request(apiurl)
				.delete('/posts/')
				.send({ id : testPost.id })
				.expect(200)
				.expect(function (res) {
					res.body._id.toString().should.eql(testPost.id.toString());
					res.body.title.should.equal(testPost.title);
					res.body.body.should.equal(testPost.body);
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

			post.create(testPost.title, testPost.body, function (err, data) {
				testPost.id = data._id;
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

