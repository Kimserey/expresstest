/*
* routes/index
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global */
"use strict";

var routes = function(connectionString) {
	var post = require('../models/post')(connectionString),
		express = require('express'),
		router = express.Router(),
		writeResponse;

	router.use(function (req, res, next) {
		res.contentType('json');
		next();
	});

	router.route('/posts/:id')
		.get(function (req, res, next) {
			post.read(req.params.id, function (err, data) {
				writeResponse(res, err, data);
			});
		});

	router.route('/posts')
		.get(function (req, res, next) {
			post.list(function (err, data) {
				writeResponse(res, err, data);
			});
		})
		.post(function (req, res, next) {
			var title = req.body.title,
				body = req.body.body;

			post.create(title, body, function (err, data) {
				writeResponse(res, err, data, 201);
			});
		})
		.put(function (req, res, next) {
			post.update(req.body.id, req.body, function (err, data) {
				writeResponse(res, err, data, 200, 404);
			});
		})
		.delete(function (req, res, next) {
			post.remove(req.body.id, function (err, data) {
				writeResponse(res, err, data, 200, 404);
			});
		});

	writeResponse = function (res, err, data, successStatus, errorStatus) {
		if (err) {
			res.status(errorStatus || 400)
			   .json(err);
		}

		res.status(successStatus || 200)
		   .json(data);
	};

	return router;
};

module.exports = routes;