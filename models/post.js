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
		ObjectId = mongoose.Types.ObjectId,
		postSchema = new Schema({
			title : { type: String, required: true },
			body : { type: String, required: true },
			date : { type: Date, default: Date.now }
		}),
		_PostModel = mongoose.model('Post', postSchema),
		_create, _read;

	_create = function (title, body, callback) {
		var post = new _PostModel();
		post.title = title;
		post.body = body;
		post.save(function (err, post) {
			if (err) {
				callback(err);
			}

			callback(null, post);
		});
	};

	_read = function (id, callback) {
		_PostModel
		 .findOne({ _id : new ObjectId(id) })
		 .exec(function (err, data) {
		 	if (err) {
		 		callback(err);
		 	}

		 	callback(null, data);
		 });
	};

	mongoose.connection.on('error', function (err) {
		console.log('connection error:', err);
	});

	mongoose.connection.on('open', function () {
		console.log('successfully connected to mongodb');
	});

	return {
		create : _create,
		read : _read
	};
}());

module.exports = post;