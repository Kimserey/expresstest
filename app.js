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
	routes  = require('./routes'),
	app     = express(),
	server  = http.createServer(app);

app.get('/', routes.test);

server.listen(3000);
console.log("Listening on 3000");