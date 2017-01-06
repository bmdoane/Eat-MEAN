'use strict'

const mongoose = require('mongoose')
const Restaurant = mongoose.model('Restaurant')

// Get all reviews
module.exports.reviewsGetAll = (req, res) => {
	const restaurantId = req.params.restaurantId
	console.log("Get restaurantID", restaurantId)
	
	Restaurant
		.findById(restaurantId)
		// .select('reviews')
		.exec((err, doc) => {
			console.log('doc', doc)
			res
				.status(200)
				.json(doc.reviews)			
		})
}

// Get a single review
module.exports.reviewsGetOne = (req, res) => {
	
}