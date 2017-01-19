'use strict'

const mongoose = require('mongoose')
const User = mongoose.model('User')
const { hashSync, genSaltSync, compareSync } = require('bcrypt-nodejs')
const { sign, verify } = require('jsonwebtoken')

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
					// Args - payload, secret, optional(expires)
					// Secret should be an env var
					let token = sign({ userName: user.userName }, 'secret', {expiresIn: 3600 })
					res
						// Token consists of header, payload and verified signature
						.status(200).json({ success: true, token: token })									
				} else {
					res
						.status(401).json('Unauthorized')
				}
			}
		})		
}

// Tokens need to be sent as part of the headers.authorization
module.exports.authenticate = (req, res, next) => {
	let headerExists = req.headers.authorization
	if (headerExists) {
		// Authorization Bearer xxx
		let token = req.headers.authorization.split(' ')[1] 
		verify(token, 'secret', (error, decoded) => {
			if (error) {
				console.log(error)
				res
					.status(401).json('Unauthorized')
			} else {
				req.user = decoded.userName
				next()
			}
		})
	} else {
		res
			.status(403).json('No token provided')
	}
}





