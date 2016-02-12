var app = angular.module('app.routes', ['ngRoute'])

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
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
	$locationProvider.html5Mode(true);
}]);