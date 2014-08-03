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
		this.posts = [{title: 'Toto is back', body: 'Today is the return of the master chef!'}];
		$scope.x = 'hello';

		// postService.getPosts().then(function (posts) {
		// 	posts.forEach(function (post) {
		// 		// $scope.posts.push(post);
		// 	})
		// 	$scope.x = 'http done';
		// });
	});

	app.controller('PostController', function ($scope, postService) {
		this.post = {};

		this.addPost = function () {
			this.post = {};
		};

		this.reset = function () {
			this.post = {};
		};
	});

	app.factory('postService', function ($http) {
		return {
			getPosts : function () {
				return $http
					.get('/api/posts/')
					.then(function (res) {
						return res.data;
					});
			}
		};
	});
}());