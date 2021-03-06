var app = angular.module('app.routes', ['ngRoute'])

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  	  .when('/', {
	  	controller: "indexController",
	  	templateUrl: "app/views/pages/index2.html"
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
	  .when('/vlogs', {
	  	controller: "vlogController",
	  	templateUrl: "app/views/pages/vlogs.html"
	  })
	  .when('/karatbars', {
	  	// controller: "karatbarsController",
	  	templateUrl: "app/views/pages/karatbars.html"
	  })
	  //.when('/blog/2014/March/:blogId', {
	  //	controller: "blogMonthController",
	  //	templateUrl: "app/views/pages/2014/March/test.html"
	  //})
	  .when('/vlogs/:vlogId', {
	  	controller: "vlogDetailsCtrl",
	  	templateUrl: "app/views/pages/vlog-details.html"
	  })
	  .when('/contact', {
	  	controller: "contactController",
	  	templateUrl: "app/views/pages/contact.html"
	  })
	  .when('/store', {
	  	controller: "storeController",
	  	templateUrl: "app/views/pages/store.html"
	  })
	  .when('/products/:productSku', {
	  	controller: "storeController",
	  	templateUrl: "app/views/pages/product.html"
	  })
	  .when('/cart', {
            templateUrl: 'app/views/pages/cart.html',
            controller: 'storeController'
      })
	  .when('/funny', {
	  	controller: "funnyController",
	  	templateUrl: "app/views/pages/funny.html"
	  })
	  .otherwise({
	  	redirectTo: '/'
	  });
	$locationProvider.html5Mode(true);
}]);