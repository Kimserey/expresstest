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

		service.list()
				.then(function (res) {
					res.data.forEach(function (data) {
						$scope.posts.push({ 
							id: data._id, 
							title : data.title, 
							body : data.body 
						});
					});
				});
	}]);

	app.controller('PostController', ['$scope', 'postService', function ($scope, service) {
		$scope.addPost = function (post) {
			
			service
			 .post(post.title, post.body)
			 .then(function (res) {
			 	var posted = res.data;

			 	$scope.posts.push({ 
			 		id: posted._id, 
			 		title: posted.title,
			 		body: posted.body
			 	});
			 });
			$scope.reset();
		};

		$scope.reset = function () {
			$scope.post = {};
		};

		$scope.reset();
	}]);

	app.factory('postService', ['$http', function ($http) {
		return {
			list : function () {
				 return $http.get('/api/posts/');
			},
			get : function (id) {
				return $http.get('/api/posts/' + id);
			},
			post : function (title, body) {
				return $http.post('/api/posts', { 
					title: title, 
					body: body 
				});
			},
			put : function (id, title, body) {
				return $http.put('/api/posts', { 
					id: id, 
					title: title, 
					body: body
				});
			},
			remove : function (id) {
				return $http.delete('/api/posts', {
					id : id
				});
			}
		};
	}]);
}());