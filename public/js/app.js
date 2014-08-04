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

	app.controller('PostboardController', ['$scope', 'postService', function ($scope, service) {
		$scope.posts = [];

		service.getPosts()
				.then(function (res) {
					res.data.forEach(function (data) {
						$scope.posts.push({ title : data.title, body : data.body });
					});
				});
	}]);

	app.controller('PostController', ['$scope', 'postService', function ($scope, postService) {
		$scope.addPost = function () {
			$scope.posts.push($scope.post);
			$scope.reset();
		};

		$scope.reset = function () {
			$scope.post = {};
		};

		$scope.reset();
	}]);

	app.factory('postService', ['$http', function ($http) {
		return {
			getPosts : function (cb) {
				 return $http.get('/api/posts/');
			}
		};
	}]);
}());