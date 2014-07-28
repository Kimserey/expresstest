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
		_create, _update, _read, _remove, _list;

	_create = function (title, body, callback) {
		_PostModel.create({
			title : title,
			body  : body
		}, function (err, data) {
			if (err) {
				callback(err);
			}

			callback(null, data);
		});
	};

	_update = function (id, propMap, callback) {
		_PostModel
		 .findByIdAndUpdate(id, {
		 	title : propMap.title,
		 	body : propMap.body
		 })
		 .exec(function (err, data) {
		 	if(err) {
		 		callback(err);
		 	}

		 	callback(null, data);
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

	_list = function (callback) {
		_PostModel
		 .find()
		 .exec(function (err, data) {
		 	if(err) {
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
		update : _update,
		read : _read,
		remove : _remove,
		list : _list
	};
}());

module.exports = post;