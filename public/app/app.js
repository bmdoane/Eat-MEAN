'use strict'

angular.module('eatMEAN', ['ngRoute'])
	.config(config)
	.controller('RestaurantCtrl', RestaurantCtrl)

	function config($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/restaurant.html',
				controller: RestaurantCtrl,
				controllerAs: 'vm'
			})
	}

	function RestaurantCtrl() {
		let vm = this
		vm.title = 'EatMEAN App'
	}