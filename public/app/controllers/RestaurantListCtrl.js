'use strict'

app.controller('RestaurantListCtrl', function(RestaurantFactory) {

	let vm = this
	vm.title = 'EatMEAN App'
	
	RestaurantFactory.restaurantList()
		.then((response) => {
			vm.restaurants = response.data
		})

})