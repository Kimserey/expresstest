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
	connectionString = process.argv[2] || 'mongodb://localhost/expresstestDb_test',
	router  = require('./routes')(connectionString),
	app     = express(),
	server  = http.createServer(app),
	env = process.env.NODE_ENV || 'development';

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

if (env === 'development') {
	app.use(function (req, res, next) {
		var date = new Date(),
			dateString = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

		console.log('[' + dateString + '][' + req.method + '] : ' + req.path
			+ ' --- req body : ' + JSON.stringify(req.body));
		next();
	});
}

app.use('/api', router);

server.listen(3000);

console.log(
	'\n\n'
	+ '------------------\n' 
	+ '- Server started -\n'
	+ '------------------\n' 
	+ 'port           : ' + 3000 + ',\n' 
	+ 'env            : '  + env  + ',\n'
	+ 'MongoDB string : ' + connectionString 
	+ '\n\n');

