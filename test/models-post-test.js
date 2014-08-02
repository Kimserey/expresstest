/*
* post test 
*/

/*jslint         continue : true, unparam : true
  devel  : true, indent  : 2,     maxerr   : 50,
  newcap : true, nomen   : true,  plusplus : true,
  regexp : true, sloppy  : true,  vars     : false,
  white  : true
*/

/*global describe, it, before, beforeEach, after, afterEach*/
"use strict";

describe('model post', function() {
	var post = require('../models/post.js')('mongodb://localhost/expresstestDb_test'),
		should = require('should'),
		mongoose = require('mongoose'),
		db,
		title = 'My title',
		body = 'Hello world';

	describe('#create', function () {
		it('Should create post', function (done) {
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

	describe('#update #read #remove', function () {
		var id;

		it('Should update post', function (done) {
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

		it('Shoud read post', function (done) {
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
	
		it('Should remove post', function (done) {
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

		beforeEach(function (done) {
			post.create(title, body, function (err, data) {
				id = data._id;
				done();
			});
		});
	});

	describe('#list', function (){
		var ids = [];

		it('Should list posts', function (done) {
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