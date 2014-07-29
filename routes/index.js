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

var post = require('../models/post'),
	express = require('express'),
	router = express.Router();

router.route('/posts/:id')
	.all(function (req, res, next) {
		res.contentType('json');
		next();
	})
	.get(function (req, res, next) {
		console.log('get ' + req.params.id);
		res.end('get ' + req.params.id);
	});

router.route('/posts')
	.all(function (req, res, next) {
		res.contentType('json');
		next();
	})
	.get(function (req, res, next) {
		res.end('get list');
	})
	.post(function (req, res, next) {
		res.end('post ' + req.body.test);
	})
	.put(function (req, res, next) {
		res.end('put ' + req.body.test);
	})
	.delete(function (req, res, next) {
		res.end('delete ' + req.body.test);
	});

module.exports = router;