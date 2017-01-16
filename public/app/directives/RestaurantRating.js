'use strict'

app.directive('restaurantRating', restaurantRating)
// Camel casing restaurantRating will convert to <restaurant-rating> in html

function restaurantRating() {
	return {
		restrict: 'E', // E - element
		template: '<span>{{ vm.rating }}</span>'
		// bindToController: true,
		// controller: 'HotelController',
		// controllerAs: 'vm',
		// scope: {
		// 	rating: '@'
		// }
	}
}

// ng-repeat='rating in vm.rating track by $index'
// class='glyphicon glyphicon-star'

