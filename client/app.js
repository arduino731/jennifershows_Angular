'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
	'ngRoute', 
	'angularUtils.directives.dirPagination',
	// 'ui.bootstrap',
	'JennifershowsApp.services'
	// 'JenniferShows.controller'
	]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	//   .when('/', {
	  // 	controller: "mainController",
	  // 	templateUrl: "pages/main.html"
	  // })
  	  .when('/', {
	  	controller: "indexController",
	  	templateUrl: "pages/index.html"
	  })
	  .when('/recipes', {
	  	controller: "recipesController",
	  	templateUrl: "pages/recipes.html"
	  })
	  .when('/recipes/:recipeId', {
	  	controller: "recipeDetailsCtrl",
	  	templateUrl: "pages/recipe-details.html",
	  })
	  // .when('/portfolio', {
	  // 	controller: "portfolioController",
	  // 	templateUrl: "pages/portfolio.html"
	  // })
	 //  .when('/portfolio/:portfolioId', {
		// controller: 'portfolioDetailsCtrl',
		// templateUrl: 'pages/portfolio-details.html',
		// })
	  .when('/about', {
	  	controller: "aboutController",
	  	templateUrl: "pages/about.html"
	  })
	  .when('/team', {
	  	controller: "teamController",
	  	templateUrl: "pages/team.html"
	  })
	  .when('/contact', {
	  	controller: "contactController",
	  	templateUrl: "pages/contact.html"
	  })
	  .otherwise({
	  	redirectTo: '/'
	  });

}]);

// app.filter('pagination', function() {
// 	return function(input, start) {
//   		start = +start;
//   		return input.slice(start);
//   	};
// });


// app.controller("mainController", function($scope, $location){
// 	$scope.message = "this is main page";
// 	$scope.isActive = function(route) {
//         return route === $location.path();
//     }
// });


app.controller("indexController", function($scope, $location){
	$scope.message = "this is index page";
	$scope.isActive = function(route) {
        return route === $location.path();
    }
});

app.controller("recipesController", ['$scope', '$http', '$log', 'ergastAPIservice', function($scope, $http, $log, ergastAPIservice){
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
// app.controller("portfolioController", ['$scope', '$http', '$log', function($scope, $http, $log){
// 	$http.get('json/portfolio.json').success(function(data){
// 		$scope.portfolios = data;
// 		$scope.currentPage = 0;
// 		$scope.pageSize = 3;

// 		$scope.numberOfPages = function() {
// 			return Math.ceil($scope.portfolios.length / $scope.pageSize);
// 		};
// 	});

// 	$scope.setPage = function (pageNo) {
//     $scope.currentPage = pageNo;
//   	};

// 	$scope.pageChanged = function() {
// 	   $log.log('Page changed to: ' + $scope.currentPage);
// 	}; 
// }]);


app.controller('recipeDetailsCtrl',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var recipeId = $routeParams.recipeId;
	$http.get('json/portfolio.json').success(function(data){
			$scope.portfolio = $filter('filter')(data, function(d){
				return d.id == portfolioId;
			})[0];
			$scope.mainImage = $scope.portfolio.images[0].name;
	});

	$scope.setImage = function(image){
		$scope.mainImage = image.name; 
	}
}]);

// app.controller('portfolioDetailsCtrl',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
// 	var portfolioId = $routeParams.portfolioId;
// 	$http.get('json/portfolio.json').success(function(data){
// 			$scope.portfolio = $filter('filter')(data, function(d){
// 				return d.id == portfolioId;
// 			})[0];
// 			$scope.mainImage = $scope.portfolio.images[0].name;
// 	});

// 	$scope.setImage = function(image){
// 		$scope.mainImage = image.name; 
// 	}
// }]);


app.controller("aboutController", function($scope){
	
});

app.controller("teamController", function($scope){
	$scope.message = "team page!"; 
});

app.controller("contactController", function($scope){
	$scope.message = "Contact Page!"; 
});