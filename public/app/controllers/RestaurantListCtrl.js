'use strict'

app.controller('RestaurantListCtrl', RestaurantListCtrl)

function RestaurantListCtrl(RestaurantFactory) {
	console.log('Hello Nurse!')
	console.log("RestaurantFactory", RestaurantFactory);
	let vm = this
	vm.title = 'EatMEAN App'
	RestaurantFactory.restaurantList()
		console.log('Not here!')
		.then((response) => {
			// console.log("response", response)
			vm.restaurants = response.data
		})
}