/*
* routes index tests
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/*global describe, it*/
"use strict";

var expect = require("chai").expect,
	request = require("supertest"),
	should = require("should");

describe("routes", function () {
	var url = "http://localhost:3000";

	describe("/test", function () {
		it("Should return Hello World", function (done) {
			request(url)
				.get("/test")
				.end(function (err, res) {
					if (err) {
						throw err;
					}

					res.text.should.equal("Hello World");
					done();
				});
		});
	});
});