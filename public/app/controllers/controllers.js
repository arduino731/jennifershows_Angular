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

app.controller("storeController", function($scope, $filter, $routeParams, $location, DataService, $sce,  CONFIG){
    $scope.dataLoaded = false;

    /*#####################
    CONFIG
    ######################*/
    /* our global variabls */
    $scope.STORE_ID = CONFIG.CF_STORE_ID;
    $scope.STORE_PAGE = CONFIG.CF_STORE_PAGE;
    $scope.STORE_BG_IMAGE = CONFIG.CF_STORE_BG_IMAGE;
    $scope.DISTRIBUTOR_ID = CONFIG.CF_DISTRIBUTOR_ID;
    $scope.PAYMENT_PAYPAL_BUYNOW = CONFIG.CF_PAYMENT_PAYPAL_BUYNOW;
    $scope.PAYMENT_GOOGLE_WALLET_ID = CONFIG.CF_PAYMENT_GOOGLE_WALLET_ID;
    $scope.PAYMENT_STRIPE = CONFIG.CF_PAYMENT_STRIPE;
    $scope.PRODUCTS_FILE = CONFIG.CF_PRODUCTS_FILE;
    $scope.PRODUCTS_FOLDER = CONFIG.CF_PRODUCTS_FOLDER;
    $scope.NAVBAR_THEME = CONFIG.CF_NAVBAR_THEME;
    $scope.NAVBAR_LOGO_TEXT = CONFIG.CF_NAVBAR_LOGO_TEXT;
    $scope.NAVBAR_LOGO_LINK = CONFIG.CF_NAVBAR_LOGO_LINK;
    $scope.INSIDE_HEADER_SHOW = CONFIG.CF_INSIDE_HEADER_SHOW;
    $scope.INSIDE_HEADER_LINK = CONFIG.CF_INSIDE_HEADER_LINK;
    $scope.INSIDE_HEADER_IMAGE = CONFIG.CF_INSIDE_HEADER_IMAGE;
    $scope.INSIDE_HEADER_TITLE = CONFIG.CF_INSIDE_HEADER_TITLE;
    $scope.CAROUSEL_SHOW = CONFIG.CF_CAROUSEL_SHOW;
    $scope.CAROUSEL_AUTO_PLAY = CONFIG.CF_CAROUSEL_AUTO_PLAY;
    $scope.AN_CAROUSEL_IMG_VIDEO = CONFIG.CF_AN_CAROUSEL_IMG_VIDEO;
    $scope.AN_CAROUSEL_PILL = CONFIG.CF_AN_CAROUSEL_PILL;
    $scope.AN_STORE_IMG_VIDEO = CONFIG.CF_AN_STORE_IMG_VIDEO;
    $scope.AN_STORE_PILL = CONFIG.CF_AN_STORE_PILL;
    $scope.SYSTEM_NAME = CONFIG.CF_SYSTEM_NAME;
    $scope.SYSTEM_LANGUAGE = CONFIG.CF_SYSTEM_LANGUAGE;
    $scope.BASE_URL = CONFIG.CF_BASE_URL;
    $scope.API_URL = CONFIG.CF_API_URL;
    $scope.GOOGLE_ANALYTICS_ID = CONFIG.CF_GOOGLE_ANALYTICS_ID;


    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.pagedItems = [];
    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.products = [];
    $scope.slides = [];
    $scope.isActive = false;

    $scope.sections = [{ name: 'list', class: 'cbp-vm-icon cbp-vm-list' }];

    $scope.updateDisplay = function (section) {
        $scope.selected = section;
        $scope.isActive = !$scope.isActive;

        // let's flip our icons. 
        //<a href="#" class="cbp-vm-icon cbp-vm-grid cbp-vm-selected" data-view="cbp-vm-view-grid">Grid View</a>
        //<a href="#" class="cbp-vm-icon cbp-vm-list" data-view="cbp-vm-view-list">List View</a>
        if (section.class.toString() === 'cbp-vm-icon cbp-vm-grid') {
            $scope.sections = [{ name: 'list', class: 'cbp-vm-icon cbp-vm-list' }];
        }
        else {
            $scope.sections = [{ name: 'grid', class: 'cbp-vm-icon cbp-vm-grid' }];
        }
    }

    $scope.isSelected = function (section) {
        return $scope.selected === section;
    }

    $scope.fToggleOverlay = function () {
        $scope.overlayFlag = !$scope.overlayFlag; // toggle state of overlay flag.
    };

    // get store and cart from service
    $scope.store = DataService.store;
    $scope.cart = DataService.cart;

    // use routing to pick the selected product
    if ($routeParams.productSku != null) {
        $scope.product = $scope.store.getProduct($routeParams.productSku);
    }

    /*#####################
    DataService  Executes when AJAX call completes
    ######################*/
    DataService.store.getProducts().then(function (data) {
        // Build array for products
        $scope.products = data;
        // Build slides[] array for super slick carousel
        for (var i = 0, len = $scope.products.length; i < len; i++) {
            var prod = $scope.products[i];
            
            if (prod.storeid == "7cc6cb94-0938-4675-b84e-6b97ada53978") {
                if (prod.imagename.length < 1) {
                    prod.imagename = "nopic.png";
                }
                if (prod.carousel) {
                    $scope.slides.push(prod);
                }
            }
        }
        $scope.dataLoaded = true;

        if ($routeParams.productSku != null) {
            var _sku = $routeParams.productSku.toString();
            //if (_sku.length > 0) {
                for (var i = 0, len = $scope.products.length; i < len; i++) {
                    var prod = $scope.products[i];
                    if (prod.sku === _sku) {
                        $scope.product = prod;
                    }
                }
            //}
        }
        // Substantially better than the TOTAL PIECE OF CRAP FUNCTION "getUrlVars" that throw errors like crazy!
        // Given a query string "?to=email&why=because&first=John&Last=smith"
        // getUrlVar("to")  will return "email"
        // getUrlVar("last") will return "smith"
        // To convert it to a jQuery plug-in, you could try something like this:
        //(function ($) {
        //    $.getUrlVar = function (key) {
        //        var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
        //        return result && unescape(result[1]) || "";
        //    };
        //})(jQuery);
        $scope.getUrlVar = function (key) {
            var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
            return result && unescape(result[1]) || "";
        }
        var _sku = $scope.getUrlVar('sku');
        if (_sku.length > 0) {
            for (var i = 0, len = $scope.products.length; i < len; i++) {
                var prod = $scope.products[i];
                if (prod.sku === _sku) {
                    DataService.cart.addItemUrl(prod.sku, prod.productname, prod.unitprice, +1);
                }
            }
        }
        //////////////////////////////////////////////////////////////////////////////

        $scope.forceAddItem = function (sku, productname, unitprice, quantity) {
            DataService.cart.addItem(sku, productname, unitprice, quantity);

            $scope.$apply(function () {
                $scope.cart.sku = DataService.cart.sku;
                $scope.cart.productname = DataService.cart.productname;
                $scope.cart.unitprice = DataService.cart.unitprice;
            });
            return "item added";
        };


        $scope.pageCount = function () {
            return Math.ceil($scope.products.length / $scope.pageSize);
        };

        $scope.nextPage = function () {
            if ($scope.currentPage >= Math.ceil($scope.products.length / $scope.pageSize) - 1) {
                return true;
            }
            else {
                return false;
            }
        };

        //$scope.$watch('currentPage + pageSize', function () {
        //    var begin = (($scope.currentPage - 1) * $scope.pageSize);
        //    var end = begin + $scope.pageSize;
        //    $scope.filteredItems = $scope.products.slice(begin, end);
        //});

        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };
        $scope.filterCategory = function (categoryname) {
            //$('#searchfield').val('');
            $scope.filteredItems = $filter('filter')($scope.products, function (product) {
                for (var attr in product) {
                    if (searchMatch(product[categoryname], $scope.query))
                        return true;
                }
                return false;
            });
            $scope.currentPage = 0;
            $scope.groupedPages();
        };
        $scope.filterCategory = function (column, categoryname) {
            //$('#searchfield').val('');
            $scope.filteredItems = $filter('filter')($scope.products, function (product) {
                for (var attr in product) {
                    if (searchMatch(product[column], categoryname))
                        return true;
                }
                return false;
            });
            $scope.currentPage = 0;
            $scope.groupedPages();
        };
        $scope.groupedPages = function () {
            $scope.pagedItems = [];
            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.pageSize === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.pageSize)] = [$scope.filteredItems[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.pageSize)].push($scope.filteredItems[i]);
                }
            }
        };

        // functions have been describe process the data for display
        $scope.filterCategory();
        // $scope.search();
        ////////////////////////////////////////////////////////////////////////
    }); /* END - DataService */
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

app.filter('unsafe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});
