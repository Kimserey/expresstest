/*
* app
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global */
"use strict";

var http    = require('http'),
	express = require('express'),
	bodyParser = require('body-parser'),
	router  = require('./routes'),
	app     = express(),
	server  = http.createServer(app),
	env = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

if (env === 'development') {
	app.use(function (req, res, next) {
		console.log('received : ' + req.method + req.path);
		next();
	});
}

app.get('/test', function (req, res) {
	res.end('Hello World');
});

app.use('/api', router);

server.listen(3000);
console.log("Listening on 3000, env : " + env);

