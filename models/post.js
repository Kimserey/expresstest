/*
* post
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global */
"use strict";

var post = (function () {
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		postSchema = new Schema({
			title : { type: String, required: true },
			body : { type: String, required: true },
			date : { type: Date, default: Date.now }
		}),
		_PostModel = mongoose.model('Post', postSchema),
		_create;

	_create = function (title, body, callback) {
		var post = new _PostModel();
		post.title = title;
		post.body = body;
		post.save(function (err) {
			if (err) {
				callback(err);
			}

			callback(null, {
				id : post._id,
				title : title,
				body : body,
				date : post.date
			});
		});
	};

	mongoose.connection.on('error', function (err) {
		console.log('connection error:', err);
	});

	mongoose.connection.on('open', function () {
		console.log('successfully connected to mongodb');
	});

	return {
		create : _create
	};
}());

module.exports = post;