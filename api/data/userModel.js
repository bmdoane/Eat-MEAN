'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
	userName: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String
	},
	password: {
		type: String,
		required: true
	}
})

mongoose.model('User', userSchema)