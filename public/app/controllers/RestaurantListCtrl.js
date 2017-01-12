'use strict'

app.controller('RestaurantListCtrl', RestaurantListCtrl)

function RestaurantListCtrl($http) {
	let vm = this
	vm.title = 'EatMEAN App'
	$http.get('/api/restaurants').then((response) => {
		console.log("response", response)
	})
}