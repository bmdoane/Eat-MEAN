'use strict'

const app = angular.module('eatMEAN', ['ngRoute'])

app.config(function($httpProvider, $routeProvider, $locationProvider) {

	$httpProvider.interceptors.push('AuthInterceptor')
  $locationProvider.hashPrefix('')

  $routeProvider
	.when('/', {
		templateUrl: '/partials/main.html',
		access: {
			restricted: false
		}
	})  
	.when('/restaurants', {
		templateUrl: '/partials/restaurantList.html',
		controller: 'RestaurantListCtrl',
		controllerAs: 'vm',
		access: {
			restricted: false
		}		
	})
	.when('/restaurant/:id', {
		templateUrl: '/partials/restaurantDisplay.html',
		controller: 'RestaurantDisplayCtrl',
		controllerAs: 'vm',
		access: {
			restricted: false
		}		
	})
	.when('/register', {
		templateUrl: '/partials/register.html',
		controller: 'RegisterCtrl',
		controllerAs: 'vm',
		access: {
			restricted: false
		}		
	})
	.when('/profile', {
		templateUrl: '/partials/profile.html',
		controllerAs: 'vm',
		access: {
			restricted: true
		}		
	})	
	.otherwise('/')

})

app.run(function($rootScope, $location, $window, AuthFactory) {
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
		if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
			event.preventDefault()
			$location.path('/')
		}
	})
})

