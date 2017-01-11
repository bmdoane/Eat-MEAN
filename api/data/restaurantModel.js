'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

// Nested document
const reviewSchema = new Schema({
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
	review: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	} 	
})

// Parent Schema with validations
const restaurantSchema = new Schema({
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
		"default": 0
	},
	types: [String],
	formatted_address: {
		type: String,
		required: true
	},
	geometry: {
		coordinates: {
			type: [Number],
			index: '2sphere'		
		}
	},
	reviews: [reviewSchema]
})

// COMPILING MODEL
// Params - Model name, schema, optional(mongodb collection)
mongoose.model('Restaurant', restaurantSchema)