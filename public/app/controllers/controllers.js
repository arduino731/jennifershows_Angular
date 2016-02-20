var app = angular.module('JenniferShows.controller', []);

app.controller("indexController", function($scope, $location){
	$scope.message = "this is index page";
	$scope.isActive = function(route) {
        return route === $location.path();
    }

  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  var currIndex = 0; 

    $scope.addSlide = function() {
    slides.push({
      image:[ 'assets/img/port/port01.jpg', 'assets/img/port/port02.jpg', 'assets/img/port/port03.jpg'][slides.length % 3],
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

// $scope.addSlide = function(){
//   slides.push(
//     {
//       image: 'http://lorempixel.com/400/200/',
//       text: "Nice image"
//     },
//     {
//       image: 'http://lorempixel.com/400/200/food',
//       text: "Awesome photograph"
//     },
//     {
//       image: 'http://lorempixel.com/400/200/sports',
//       text: "That is so cool"
//     },
//     {
//       image: 'http://lorempixel.com/400/200/people',
//       text: "I love that"
//     }
//   );

// };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
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

app.controller("blogController", ['$scope', '$http', '$log', function($scope, $http, $log){
	$scope.blogs = []; // declare an empty array 

		$http.get('json/blogs.json').success(function(data){
			$scope.blogs = data;
		  $scope.currentPage = 1;
			$scope.pageSize = 2; // 10
			console.log(data);
		})

	$scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
	};
}]);

app.controller('blogDetailsCtrl',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var blogId = $routeParams.blogId;
	// $scope.recipe = ; //declare an empty array
	// $http.get('json/recipes.json').success(function(data){
	// 		$scope.recipe = $filter('filter')(data, function(d){
	// 			return d.id == blogId;
	// 		})[0];
	// 		$scope.mainImage = $scope.recipe.images[0].name;
	// 		$scope.code = $scope.recipe.youtube;
	// 		console.log($scope.code);
	// });

	// $scope.setImage = function(image){
	// 	$scope.mainImage = image.name; 
	// }
}]);

app.controller('blogMonthController',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var blogId = $routeParams.blogId;
	// $scope.recipe = ; //declare an empty array
	// $http.get('json/recipes.json').success(function(data){
	// 		$scope.recipe = $filter('filter')(data, function(d){
	// 			return d.id == blogId;
	// 		})[0];
	// 		$scope.mainImage = $scope.recipe.images[0].name;
	// 		$scope.code = $scope.recipe.youtube;
	// 		console.log($scope.code);
	// });
}]);

app.controller("contactController", function($scope){
	$scope.message = "Contact Page!"; 
});

