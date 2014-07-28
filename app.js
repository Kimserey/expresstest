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


app.all('/:obj_type/*?', function (req, res, next) {
	console.log('requested obj: ', req.params.obj_type);
	res.contentType('json');
	next();
});

app.get('/:obj_type/list', function (req, res) {
	res.send({ title : req.params.obj_type + ' listed' });
});

app.get('/:obj_type/read/:id([0-9]+)', function (req, res) {
	res.send({ title : req.params.obj_type + '-' + req.params.id + ' read' });
});

app.post('/:obj_type/create', function (req, res) {
	res.send({ title : req.params.obj_type + ' created' });
});

app.post('/:obj_type/update/:id([0-9]+)', function (req, res) {
	res.send({ title : req.params.obj_type +  '-' + req.params.id + ' updated' });
});

app.post('/:obj_type/delete/:id([0-9]+)', function (req, res) {
	res.send({ title : req.params.objt + '-' + req.params.id + ' deleted' });
});

app.get('/test', routes.test);

server.listen(3000);
console.log("Listening on 3000");