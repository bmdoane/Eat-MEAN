'use strict'

const mongoose = require('mongoose')
let User = mongoose.model('User')
let { hashSync, genSaltSync, compareSync } = require('bcrypt-nodejs')

module.exports.register = (req, res) => {
	console.log('Registering user')

	let userName = req.body.userName
	let name = req.body.name || null
	let password = req.body.password

	User
		.create({
			userName: userName,
			name: name,
			// Hashing pw with bcrypt
			password: hashSync(password, genSaltSync(10))
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
	console.log('Logging in user')

	let userName = req.body.userName
	let password = req.body.password

	User
		.findOne({
			userName: userName
		}).exec((err, user) => {
			if (err) {
				console.log(err)
				res
					.status(400).json(err)
			} else {
				if (compareSync(password, user.password)) {
					console.log('User found', user)
					res
						.status(200).json(user)									
				} else {
					res
						.status(401).json('Unauthorized')
				}
			}
		})		
}





