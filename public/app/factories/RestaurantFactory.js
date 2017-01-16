'use strict'

app.factory('RestaurantFactory', function($http, $routeParams) {
	
	const restaurantList = () => {
		return $http.get('/api/restaurants?count=10').then(complete).catch(failed)
	}

	const displayRestaurant = (id) => {
		return $http.get(`/api/restaurants/${id}`).then(complete).catch(failed)	
	}

	function complete(response) {
		return response.data
	}

	function failed(error) {
		console.log('error', error.statusText)
	}

	return { restaurantList, displayRestaurant }

})
