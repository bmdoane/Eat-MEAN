'use strict'

const mongoose = require('mongoose')

// Schema with validations
const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	photos: [String],
	price_level: {
		type: Number,
		min: 0,
		max: 5,
		default: 0
	},
	type: [String],
	formatted_address: String
})

// Params - Model name, schema, optional(mongodb collection)
mongoose.model('Restaurant', restaurantSchema)