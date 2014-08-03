/*
* post controller
*/

/*jslint         browser    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true, unparam : true
*/

/* global angular*/

(function () {
	var app = angular.module('postboard', [ ]);

	app.controller('PostboardController', function ($scope, postService) {
		this.posts = [];

		postService.getPosts().then(function (posts) {
		});
	});

	app.controller('PostController', function ($scope, postService) {
		this.post = {};

		this.addPost = function () {
			postService.sayHello(this.post);
			this.post = {};
		};
	});

	app.factory('postService', function ($http, $window) {
		return {
			getPosts : function () {
				return $http
					.get('/api/posts/')
					.then(function (res) {
						return res.data;
					});
			},
			sayHello : function (post) {
				$window.alert(post);
				$window.alert('Hello ' + post.title + ' ' + post.body);
			}
		};
	});
}());