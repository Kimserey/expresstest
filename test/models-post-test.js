/*
* post test 
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global describe, it, before, beforeEach, after, afterEach*/
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

	describe('post#list', function (){
		var ids = [];

		it('Should list all posts', function (done) {
			post.list(function (err, data) {
				var data_ids;

				if (err) {
					throw err;
				}

				data.should.have.length(5);
				data_ids = data.map(function (item) { 
					return item._id; 
				});
				ids.should.eql(data_ids);
				done();
			});
		});

		before(function (done) {
			(function create (count) {
				if (count === 5) {
					return done();
				}

				post.create(title, body, function (err, data) {
					ids.push(data._id);
					count += 1;
					create(count);
				});	
			}(0));
		});
	});

	before(function (done) {
		mongoose.connect('mongodb://localhost/expresstestDb_test');
		db = mongoose.connection;
		done();
	});

	afterEach(function (done){
		db.collections.posts.drop();
		done();
	});

	after(function (done) {
		db.close();
		done();
	});
});