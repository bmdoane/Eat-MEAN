'use strict'

const app = angular.module('eatMEAN', ['ngRoute'])

app.config(function ($routeProvider, $locationProvider) {

  $locationProvider.hashPrefix('')

  $routeProvider
	.when('/', {
		templateUrl: '/partials/restaurantList.html',
		controller: 'RestaurantListCtrl',
		controllerAs: 'vm'
	})
	.when('/restaurant/:id', {
		templateUrl: '/partials/restaurantDisplay.html',
		controller: 'RestaurantDisplayCtrl',
		controllerAs: 'vm'
	})
	.when('/register', {
		templateUrl: '/partials/register.html',
		controller: 'RegisterCtrl',
		controllerAs: 'vm'
	})
	.otherwise('/')

})

