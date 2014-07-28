/*
* post test 
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global describe, it, before, after*/
"use strict";

describe('Models post', function() {
	var post = require('../models/post.js'),
		should = require('should'),
		mongoose = require('mongoose'),
		db;

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

	describe('post#create', function () {
		var title = 'My title',
			body = 'Hello world';

		it('Should create a post { title: My title, body: Hello world  }', function (done) {
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

	// describe('post#get', function () {
	// 	it('Shoud get all the posts', function (done) {
			
	// 	});
	// });
});