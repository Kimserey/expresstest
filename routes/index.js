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

router.use(function (req, res, next) {
	res.contentType('json');
	next();
});

router.route('/posts/:id')
	.get(function (req, res, next) {
		post.read(req.params.id, function (err, data) {
			if (err) {
				res.json(err);
			}
			res.json(data);
		});
	});

router.route('/posts')
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