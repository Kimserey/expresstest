/*
* post test 
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global describe, it, before, beforeEach, after*/
"use strict";

describe('Models post', function() {
	var post = require('../models/post.js'),
		should = require('should'),
		mongoose = require('mongoose'),
		db,
		title = 'My title',
		body = 'Hello world';

	describe('post#create', function () {
		it('Should create a post', function (done) {
			post.create(title, body, function (err, data) {
				if (err) {
					throw err;
				}

				data.title.should.equal(title);
				data.body.should.equal(body);
				done();
			});
		});
	});

	describe('post#update#read#remove', function () {
		var id;

		describe('#update', function () {
			it('Should update the post', function (done) {
				var prop_map = {
					title : 'Modified title',
					body : 'Modified hello world'
				};

				post.update(id, prop_map, function (err, data) {
					if (err) {
						throw err;
					}

					data._id.should.eql(id);
					data.title.should.equal(prop_map.title);
					data.body.should.equal(prop_map.body);
					done();
				});
			});
		});

		describe('#read', function () {
			it('Shoud read one post', function (done) {
				post.read(id, function (err, data) {
					if (err) {
						throw err;
					}

					data._id.should.eql(id);
					data.title.should.equal(title);
					data.body.should.equal(body);
					done();
				});
			});
		});
		
		describe('#remove', function (done) {
			it('Should remove one post', function (done) {
				post.remove(id, function (err, data) {
					if (err) {
						throw err;
					}

					post.read(id, function (err, data) {
						should.not.exist(data);
						done();
					});
				});
			});
		});

		beforeEach(function (done) {
			post.create(title, body, function (err, data) {
				id = data._id;
				done();
			});
		});
	});

	before(function (done) {
		mongoose.connect('mongodb://localhost/expresstestDb_test');
		db = mongoose.connection;
		done();
	});

	after(function (done) {
		db.collections.posts.drop();
		db.close();
		done();
	});
});