var app = angular.module('JenniferShows.controller', []);

app.controller("indexController", function($scope, $location){
	$scope.isActive = function(route) {
        return route === $location.path();
    }

  $scope.myInterval = 3000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  var slidees = $scope.slidees = [];
  var currIndex = 0;
  var currIndex2 = 0; 

    $scope.addSlide = function() {
    slides.push({
      image:[ 'assets/img/port/1.jpeg', 'assets/img/port/2.jpg', 'assets/img/port/3.jpg'][slides.length % 3],
      text: ['Keep calm and love Deaf','Deaf is not dumb','Deaf Government Area'][slides.length % 3],
      id: currIndex++
    });

    slidees.push({
      image:[ 'assets/img/port/4.jpg', 'assets/img/port/5.jpg', 'assets/img/port/6.jpg'][slidees.length % 3],
      text: ['I love you','Awesome photograph','I cant hear you'][slidees.length % 3],
      id: currIndex2++
    });
  };

  for (var i = 0; i < 3; i++) {
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
			// console.log(data);
		})

	$scope.pageChangeHandler = function(num) {
      console.log('meals page changed to ' + num);
	};
}]);

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    // console.log('going to page ' + num);
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
			$scope.pageSize = 4; // 10
			// console.log(data);
		})

	$scope.pageChangeHandler = function(num) {
      // console.log('meals page changed to ' + num);
	};
}]);

app.controller('blogDetailsCtrl',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var blogId = $routeParams.blogId;
	$scope.blog = []; //declare an empty array
	$http.get('json/blogs.json').success(function(data){
			$scope.blog = $filter('filter')(data, function(d){
				return d.id == blogId;
			})[0];
			// $scope.mainImage = $scope.blog.images[0].name;
			$scope.code = $scope.blog.youtube;
			console.log($scope.code);
	});

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

