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
		_create, _read, _remove;

	_create = function (title, body, callback) {
		_PostModel.create({
			title : title,
			body  : body
		}, function (err, post) {
			if (err) {
				callback(err);
			}

			callback(null, post);
		});
	};

	_read = function (id, callback) {
		_PostModel
		 .findById(id)
		 .exec(function (err, data) {
		 	if (err) {
		 		callback(err);
		 	}

		 	callback(null, data);
		 });
	};

	_remove	 = function (id, callback) {
		_PostModel
		 .findByIdAndRemove(id)
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

	return {
		create : _create,
		read : _read,
		remove : _remove
	};
}());

module.exports = post;