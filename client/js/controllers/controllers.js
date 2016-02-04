var app = angular.module('JenniferShows.controller';

app.controller('portfolioDetailsCtrl',  ['$scope', '$routeParams', '$http', '$filter', function($scope, $routeParams, $http, $filter){
	var portfolioId = $routeParams.portfolioId;
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

