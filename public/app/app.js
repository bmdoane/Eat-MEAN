'use strict'

const app = angular.module('eatMEAN', ['ngRoute'])
	
app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'partials/restaurantList.html',
			controller: RestaurantListCtrl,
			controllerAs: 'vm'
		})

})
