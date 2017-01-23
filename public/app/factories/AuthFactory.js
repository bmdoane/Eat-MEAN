'use strict'

app.factory('AuthFactory', function() {

	const AuthFactory = () => {
	  return {
	    auth: auth
	  }

	  let auth = {
	    isLoggedIn: false
	  }
	}

	return { AuthFactory }

})