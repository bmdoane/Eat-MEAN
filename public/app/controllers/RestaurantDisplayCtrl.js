'use strict'

app.controller('RestaurantDisplayCtrl', RestaurantDisplayCtrl)

function RestaurantDisplayCtrl($routeParams, RestaurantFactory) {
	let vm = this
	let id = $routeParams.id
	RestaurantFactory.restaurantDisplay(id)
		.then((response) => {
			vm.restaurant = response.data
		})
}