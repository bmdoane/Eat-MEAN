'use strict'

app.controller('RestaurantDisplayCtrl', RestaurantDisplayCtrl)

function RestaurantDisplayCtrl($http, $routeParams) {
	let vm = this
	let id = $routeParams.id
	$http.get(`/api/restaurants/${id}`)
		.then((response) => {
			vm.restaurant = response.data
		})
}