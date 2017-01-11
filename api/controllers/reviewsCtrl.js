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

// Add a review
// Helper function - timestamp added in schema
let addReview = (req, res, restaurant) => {
	restaurant.reviews.push({
		name: req.body.name,
		rating: parseInt(req.body.rating, 10),
		review: req.body.review
	})
	// Save runs on the model instance
	restaurant.save((err, restaurantUpdated) => {
		if (err) {
			res 
				.status(500)
				.json(err)
		} else {
			res 
				.status(201)
				.json(restaurantUpdated.reviews[restaurantUpdated.reviews.length - 1])
		}
	})
}

module.exports.reviewsAddOne = (req, res) => {
	const restaurantId = req.params.restaurantId
	console.log("Get restaurantID", restaurantId)
	
	Restaurant
		.findById(restaurantId)
		.select('reviews')
		.exec((err, doc) => {
			let response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('Error finding restaurant')
				response.status = 500
				response.message = err
			} else if (!doc) {
				console.log('Restaurant id not found in database', restaurantId)
				response.status = 404
				response.message = {
					"message" : `Restaurant ID not found ${restaurantId}`
				}
			}
			// If there is a doc add review else send back to err handling			
			if (doc) {
				addReview(req, res, doc)				
			} else {
				res
					.status(response.status)
					.json(response.message)
			}
		})
}