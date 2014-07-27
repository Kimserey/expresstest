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

var post = require("../models/post"),
	test, 
	read_obj, create_obj, 
	update_obj, delete_obj;

test = function (req, res) {
	res.end('Hello World'); 
};

module.exports = {
	test : test
};