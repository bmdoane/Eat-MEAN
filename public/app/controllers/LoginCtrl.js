'use strict'

app.controller('LoginCtrl', function($http, $location, $window, AuthFactory) {

	let vm = this

	vm.isLoggedIn = () => {
		if (AuthFactory.isLoggedIn) {
			return true
		} else {
			return false
		}
	}

	vm.login = () => {
    if (vm.username && vm.password) {
      let user = {
        username: vm.username,
        password: vm.password
      }

      $http.post('/api/users/login', user).then(function(response) {
        console.log("responseLogin", response)
        if (response.data.success) {
          $window.sessionStorage.token = response.data.token
          AuthFactory.isLoggedIn = true
        }
      }).catch(function(error) {
        console.log(error)
      })

    }
	}

	vm.logout = () => {
    AuthFactory.isLoggedIn = false
    delete $window.sessionStorage.token
    $location.path('/')
	}

	// Create a different style for active tabs
	vm.isActiveTab = (url) => {
		let currentPath = $location.path().split('/')[1]
		return (url === currentPath ? 'active' : '')
	}

	
})
