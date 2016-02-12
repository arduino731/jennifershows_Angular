'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
	'app.routes', 
	'angularUtils.directives.dirPagination',
	'ui.bootstrap',
	'JennifershowsApp.services',
	'Youtube',
	'JenniferShows.controller'
	]);
