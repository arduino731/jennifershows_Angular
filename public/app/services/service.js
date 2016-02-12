// api.json create new a module 
angular.module('JennifershowsApp.services', [])
  .factory('ergastAPIservice', function($http) {

    var ergastAPI = {};

    ergastAPI.getRecipes = function(){
    	return $http({
    		method: 'JSONP',
    		get: "json/portfolio.json"
    	});
	    // $http.get('json/portfolio.json');
	    	// $scope.recipes = data;
	    	// console.log(data);
	    // });
	}
    
    $http.get('json/portfolio.json');


    ergastAPI.getDrivers = function() {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    ergastAPI.getDriverDetails = function(id) {
      return $http({
        method: 'JSONP', 
        url: 'http://ergast.com/api/f1/2013/drivers/'+ id +'/driverStandings.json?callback=JSON_CALLBACK'
      });
    }

    return ergastAPI;
  });
