'use strict'

const mongoose = require('mongoose')
let User = mongoose.model('User')

module.exports.register = (req, res) => {
	console.log('Registering user')

	let userName = req.body.userName
	let name = req.body.name || null
	let password = req.body.password

	User
		.create({
			userName: userName,
			name: name,
			password: password
		}, (err, user) => {
			if (err) {
				console.log(err)
				res
					.status(400).json(err)
			} else {
				console.log('User created', user)
				res
					.status(201).json(user)
			}
		})

}

module.exports.login = (req, res) => {
	
}