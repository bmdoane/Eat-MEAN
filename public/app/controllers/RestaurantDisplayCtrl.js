'use strict'

app.controller('RestaurantDisplayCtrl', function($route, RestaurantFactory, $routeParams) {

	let vm = this
	let id = $routeParams.id

	RestaurantFactory.displayRestaurant(id)
		.then((response) => {
			vm.restaurant = response.data
			vm.roundedRating = Math.round(response.data.rating)
			vm.stars = getStarRating(vm.roundedRating)
		})

	function getStarRating(stars) {
		return new Array(stars)
	}

	vm.addReview = () => {
		let postData = {
			name: vm.name,
			rating: vm.rating,
			review: vm.review
		}
		if (vm.reviewForm.$valid) {
			RestaurantFactory.postReview(id, postData)
				.then((response) => {
					if (response.status === 201) {
						$route.reload()
					}
				})
				.catch((error) => {
					console.log(error)
				})
		} else {
			vm.isSubmitted = true
		}
	}	

})	