'use strict'

const mongoose = require('mongoose')
const Restaurant = mongoose.model('Restaurant')

// Get all reviews for a restaurant
module.exports.reviewsGetAll = (req, res) => {
	const restaurantId = req.params.restaurantId
	console.log('Get restaurantID', restaurantId)
	
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
				response.status = 500,
				response.message = err
			} else if (!doc) {
				console.log('Restaurant ID not found in database', restaurantId)
				response.status = 404,
				response.message = {
					'message' : `Restaurant ID ${restaurantId} not found`
				}
			} else {
			console.log('doc', doc)
			res 
				.status(response.status)
				.json(response.message)							
			}
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
			let response = {
				status: 200,
				message: []
			}
			if (err) {
				console.log('Error finding restaurant')
				response.status = 500
				response.message = err
			}	else if (!doc) {
				console.log('Restaurant ID not found in database', restaurantId)
				response.status = 404
				response.message = {
					'message' : `Restaurant ID ${restaurantId} not found in database`
				}				
			}	else {
				// Get review
				response.message = restaurant.reviews.id(reviewId)
				// If the review doesn't exist Mongoose returns null
				if (!response.message) {
					response.status = 404
					response.message = {
						'message' : `Review ID ${reviewId} not found`
					}
				}				
			}	
			res
				.status(response.status)
				.json(response.message)			
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
	console.log('Get restaurantID', restaurantId)
	
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
				console.log('Restaurant ID not found in database', restaurantId)
				response.status = 404
				response.message = {
					'message' : `Restaurant ID ${restaurantId} not found`
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

module.exports.reviewsUpdateOne = (req, res) => {
  let restaurantId = req.params.restaurantId
  let reviewId = req.params.reviewId
  console.log(`PUT reviewId ${reviewId} for restaurantId ${restaurantId}`)

  Restaurant
    .findById(restaurantId)
    .select('reviews')
    .exec((err, restaurant) => {
      let thisReview
      let response = {
        status : 200,
        message : {}
      }
      if (err) {
        console.log('Error finding restaurant')
        response.status = 500
        response.message = err
      } else if(!restaurant) {
        console.log('Restaurant ID not found in database', RestaurantId)
        response.status = 404
        response.message = {
          'message' : `Restaurant ID ${restaurantId} not found` 
        }
      } else {
        // Get the review
        thisReview = restaurant.reviews.id(reviewId)
        // If the review doesn't exist Mongoose returns null
        if (!thisReview) {
          response.status = 404
          response.message = {
            'message' : `Review ID ${reviewId} not found`
          }
        }
      }
      if (response.status !== 200) {
        res
          .status(response.status)
          .json(response.message)
      } else {
        thisReview.name = req.body.name
        thisReview.rating = parseInt(req.body.rating, 10)
        thisReview.review = req.body.review
        restaurant.save(function(err, restaurantUpdated) {
          if (err) {
            res
              .status(500)
              .json(err)
          } else {
            res
              .status(204)
              .json()
          }
        })
      }
    })	
}