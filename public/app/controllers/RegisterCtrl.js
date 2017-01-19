'use strict'

app.controller('RegisterCtrl', RegisterCtrl)

function RegisterCtrl ($http) {
	let vm = this

	vm.register = () => {
    let user = {
      username: vm.username,
      password: vm.password
    }
    // Settle username casing through app!!!!!!!!!!!
    if (!vm.username || !vm.password) {
      vm.error = 'Please add a username and a password.'
    } else {
      if (vm.password !== vm.passwordRepeat) {
        vm.error = 'Please make sure the passwords match.'
      } else {
        $http.post('/api/users/register', user).then((result) => {
          console.log(result)
          vm.message = 'Successful registration, please login.'
          vm.error = ''
        }).catch((error) => {
          console.log(error)
        })
      }
    }
  }

}