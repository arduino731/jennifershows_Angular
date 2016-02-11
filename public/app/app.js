'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
	'ngRoute', 
	'angularUtils.directives.dirPagination',
	// 'ui.bootstrap',
	'JennifershowsApp.services',
	'Youtube'
	// 'JenniferShows.controller'
	]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	  .when('/', {
	  	controller: "indexController",
	  	templateUrl: "app/views/pages/index.html"
	  })
	  .when('/recipes', {
	  	controller: "recipesController",
	  	templateUrl: "app/views/pages/recipes.html"
	  })
	  .when('/recipes/:recipeId', {
	  	controller: "recipeDetailsCtrl",
	  	templateUrl: "app/views/pages/recipe-details.html",
	  })
	  .when('/about', {
	  	controller: "aboutController",
	  	templateUrl: "app/views/pages/about.html"
	  })
	  .when('/blog', {
	  	controller: "blogController",
	  	templateUrl: "app/views/pages/blog.html"
	  })
	  .when('/contact', {
	  	controller: "contactController",
	  	templateUrl: "app/views/pages/contact.html"
	  })
	  .otherwise({
	  	redirectTo: '/'
	  });

}]);

app.controller("indexController", function($scope, $location){
	$scope.message = "this is index page";
	$scope.isActive = function(route) {
        return route === $location.path();
    }
});

app.controller("recipesController", ['$scope', '$http', '$log', 'ergastAPIservice', function($scope, $http, $log, ergastAPIservice){
	//$scope.recipes = []; // declare an empty array 
	
	// delete ergastAPIservice module 
	// ergastAPIservice.getRecipes().success(function(response){ 
	// 	$scope.portfolios = response;
	// 	console.log(response);

	// })

		$http.get('json/recipes.json').success(function(data){
			$scope.recipes = data;
		  	$scope.currentPage = 1;
			$scope.pageSize = 10;

			console.log(data);
		})

	$scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
	};
}]);

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    console.log('going to page ' + num);
  };
}

app.controller('OtherController', OtherController);

app.controller('recipeDetailsCtrl',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var recipeId = $routeParams.recipeId;
	//$scope.recipe = []; //declare an empty array
	$http.get('json/recipes.json').success(function(data){
			$scope.recipe = $filter('filter')(data, function(d){
				return d.id == recipeId;
			})[0];
			$scope.mainImage = $scope.recipe.images[0].name;
			$scope.code = $scope.recipe.youtube;
			console.log($scope.code);
	});

	$scope.setImage = function(image){
		$scope.mainImage = image.name; 
	}
}]);

app.controller("aboutController", function($scope){
	
});

app.controller("blogController", function($scope){
	$scope.message = "Blog Page";
});

app.controller("contactController", function($scope){
	$scope.message = "Contact Page!"; 
});