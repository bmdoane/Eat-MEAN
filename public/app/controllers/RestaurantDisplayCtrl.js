'use strict'

app.controller('RestaurantDisplayCtrl', function($route, $routeParams, $window, RestaurantFactory, AuthFactory, jwtHelper) {

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

	// To let only logged in users to add reviews
	vm.isLoggedIn = () => {
		if (AuthFactory.isLoggedIn) {
			return true
		} else {
			return false
		}
	}

	vm.addReview = () => {
		let token = jwtHelper.decodeToken($window.sessionStorage.token)
		let username = token.username

		let postData = {
			name: username,
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