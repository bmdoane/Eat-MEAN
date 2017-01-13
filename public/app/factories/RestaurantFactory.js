'use strict'

app.factory('RestaurantFactory', RestaurantFactory)

function RestaurantFactory($http) {
	return {
		restaurantList: restaurantList,
		restaurantDisplay: restaurantDisplay
	}
}

function restaurantList() {
	console.log("Damn")
	return $http.get('/api/restaurants').then(complete).catch(failed)
}

function restaurantDisplay(id) {
	return $http.get(`/api/restaurants/${id}`).then(complete).catch(failed)	
}

function complete(response) {
	return response.data
}

function failed(error) {
	console.log('error', error.statusText)
}