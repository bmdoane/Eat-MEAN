'use strict'

// app.factory('AuthInterceptor', AuthInterceptor);

// function AuthInterceptor($location, $q, $window, AuthFactory) {
//   return {
//     request: request,
//     response: response,
//     responseError: responseError
//   };

//   function request(config) {
//     config.headers = config.headers || {};
//     if ($window.sessionStorage.token) {
//       config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
//     }
//     return config;
//   }

//   function response(response) {
//     if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
//       AuthFactory.isLoggedIn = true;
//     }
//     if (response.status === 401) {
//       AuthFactory.isLoggedIn = false;
//     }
//     return response || $q.when(response);
//   }

//   function responseError(rejection) {
//     if (rejection.status === 401 || rejection.status === 403) {
//       console.log('Hello Nurse')
//       delete $window.sessionStorage.token;
//       AuthFactory.isLoggedIn = false;
//       $location.path('/');
//     }
//     return $q.reject(rejection);
//   }
// }

app.factory('AuthInterceptor', function($location, $q, $window, AuthFactory) {

  const request = (config) => {
  	// If config has headers use those or {}
    config.headers = config.headers || {}
    // Token stored in browser session
    if ($window.sessionStorage.token) {
      config.headers.Authorization = `Bearer ${$window.sessionStorage.token}`
    }
    return config
  }

  const response = (response) => {
    if (response.status === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      AuthFactory.isLoggedIn = true
    }
    if (response.status === 401) {
      AuthFactory.isLoggedIn = false
    }
    return response || $q.when(response)
  }

  const responseError = (rejection) => {
    if (rejection.status === 401 || rejection.status === 403) {
      delete $window.sessionStorage.token
      AuthFactory.isLoggedIn = false
      $location.path('/')
    }
    return $q.reject(rejection)
  }

  return { request, response, responseError }

})