'use strict'

app.controller('RestaurantDisplayCtrl', function(RestaurantFactory, $routeParams) {

	let vm = this
	let id = $routeParams.id

	RestaurantFactory.displayRestaurant(id)
		.then((response) => {
			console.log("single response", response);
			vm.restaurant = response
			vm.roundedRating = Math.round(response.rating)
			vm.stars = getStarRating(vm.roundedRating)
		})

	function getStarRating(stars) {
		return new Array(stars)
	}	

})	