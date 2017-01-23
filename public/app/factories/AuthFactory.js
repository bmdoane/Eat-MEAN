'use strict'

// app.factory('AuthFactory', AuthFactory)

// function AuthFactory() {
//   return {
//     auth: auth
//   }

//   let auth = {
//     isLoggedIn: false
//   }
// }

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