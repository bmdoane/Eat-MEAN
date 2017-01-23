'use strict'

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