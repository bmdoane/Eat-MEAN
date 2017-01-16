'use strict'

app.directive('restaurantRating', restaurantRating)
// Camel casing restaurantRating will convert to <restaurant-rating> in html

function restaurantRating() {
	return {
		restrict: 'E', // E - element
		template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
		bindToController: true,
		controller: 'RestaurantDisplayCtrl',
		controllerAs: 'vm',
		scope: {
			// This is the attribute
			stars: '@'
		}
	}
}


