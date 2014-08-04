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

//	Dev  - node app 3000 mongodb://localhost/expresstestDb
//  Test - node app
var http    = require('http'),
	express = require('express'),
	bodyParser = require('body-parser'),
	port = Number(process.argv[2]) || 3000,
	connectionString = process.argv[3] || 'mongodb://localhost/expresstestDb_test',
	router  = require('./routes')(connectionString),
	app     = express(),
	server  = http.createServer(app),
	env = process.env.NODE_ENV || 'development';

// ----- Begin Middleware -----
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

if (env === 'development') {
	app.use(function (req, res, next) {
		var date = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
		console.log('[' + date + '][' + req.method + '] : ' 
			+ req.path + ' --- req body : ' + JSON.stringify(req.body));
		next();
	});
}

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use('/api', router);
// ----- End Middleware -----

// ----- Begin routes -----
app.get('/', function (req, res) {
	res.redirect('/index.html');
});
// ----- End routes -----

server.listen(port);
console.log(
	'\n\n'
	+ '------------------\n' 
	+ '- Server started -\n'
	+ '------------------\n' 
	+ 'port           : ' + port + ',\n' 
	+ 'env            : '  + env  + ',\n'
	+ 'MongoDB string : ' + connectionString 
	+ '\n\n');

