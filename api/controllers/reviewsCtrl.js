'use strict'

const mongoose = require('mongoose')
const Restaurant = mongoose.model('Restaurant')

// Get all reviews
module.exports.reviewsGetAll = (req, res) => {
	const restaurantId = req.params.restaurantId
	console.log("Get restaurantID", restaurantId)
	
	Restaurant
		.findById(restaurantId)
		.select('reviews')
		.exec((err, doc) => {
			console.log('doc', doc)
			res
				.status(200)
				.json(doc.reviews)			
		})
}

// Get a single review
module.exports.reviewsGetOne = (req, res) => {
	const restaurantId = req.params.restaurantId
	const reviewId = req.params.reviewId
	console.log(`Get reviewId ${reviewId} for restaurantId ${restaurantId}`)
	
	Restaurant
		.findById(restaurantId)
		.select('reviews')
		.exec((err, restaurant) => {
			console.log('Returned restaurant', restaurant)
			let review = restaurant.reviews.id(reviewId) 
			res
				.status(200)
				.json(review)			
		})	
}