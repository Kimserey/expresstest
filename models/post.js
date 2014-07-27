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
	console.log('start post');

var post = (function () {
	var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		postSchema = new Schema({
			title : { type: String, required: true },
			body : { type: String, required: true }
		}),
		_postModel = mongoose.model('Post', postSchema),
		_create;

	console.log('start post');
	_create = function (title, body, callback) {
		_postModel.create({
			title: title,
			body: body
		}, function (err) {
			if (err) {
				callback(err);
			}

			callback(null, {
				title : title,
				body : body
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