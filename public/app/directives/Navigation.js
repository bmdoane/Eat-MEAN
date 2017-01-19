'use strict'

app.directive('navigation', navigation)

function navigation() {
	return {
		restrict: 'E',
		templateUrl: '/partials/navbar.html'
	}
}