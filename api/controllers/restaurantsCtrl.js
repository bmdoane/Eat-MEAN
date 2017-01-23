'use strict'

const mongoose = require('mongoose')
const Restaurant = mongoose.model('Restaurant')

// Trouble getting geoNear to work.  Concerns with MongoDB data, model and this method.
// const runGeoQuery = (req, res) => {

// 	let lng = parseFloat(req.query.lng)
// 	let lat = parseFloat(req.query.lat)

// 	// A geoJSON point
// 	let point = {
// 		type: 'Point',
// 		coordinates: [lng, lat]
// 	}

// 	let geoOptions = {
// 		spherical: true,
// 		maxDistance: 200000,
// 		num: 5
// 	}

// 	Restaurant
// 		.geoNear(point, geoOptions, function(err, results, stats) {
// 			console.log('point', point)
// 			console.log('geoOptions', geoOptions)
// 			console.log('results', results)
// 			console.log('stats', stats)
// 			res
// 				.status(200)
// 				.json(results)
// 		})

// }

module.exports.restaurantsGetAll = (req, res) => {
	console.log(`Requested by: ${req.user}`)

	let offset = 0
	let count = 5
	let maxCount = 10

	// if (req.query && req.query.lat & req.query.lng) {
	// 	runGeoQuery(req, res)
	// 	return
	// }

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10)
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10)
	}

	// API Golden Rule - Always send a response, status and message
	if (isNaN(offset) || isNaN(count)) {
		res
			.status(400)
			.json({
				'message' : 'If supplied in querystring, count and offset should be a number'
			})
		return
	}

	if (count > maxCount) {
		res 
			.status(400)
			.json({
				'message' : `Count limit of ${maxCount} exceeded`
			})
		return
	}
	
	Restaurant
		.find()
		.skip(offset)
		.limit(count)		
		.exec((err, restaurants) => {
			if (err) {
				console.log('Error finding restaurants')
				res
					.status(500)
					.json(err)
			} else {
				console.log('Found Restaurants', restaurants.length)
				res
					.json(restaurants)			
			}
		})

}

module.exports.restaurantsGetOne = (req, res) => {
	const restaurantId = req.params.restaurantId
	console.log('Get restaurantID', restaurantId)

	Restaurant
		.findById(restaurantId)
		.exec((err, doc) => {
			let response = {
				status: 200,
				message: doc
			}
			if (err) {
				console.log('Error finding restaurant')
				response.status = 500
				response.message = err
			} else if (!doc) {
				console.log('RestaurantId not found in database', restaurantId)
				response.status = 404
				response.message = {
					'message' : `Restaurant ID not found ${restaurantId}`
				}
			}
			res
				.status(response.status)
				.json(response.message)							
		})
}

// Add restaurant
// Helper function
let splitArray = (input) => {
  let output
  if (input && input.length > 0) {
    output = input.split(';')
  } else {
    output = []
  }
  return output
}

module.exports.restaurantsAddOne = (req, res) => {

	Restaurant
		.create({
			name: req.body.name,
			rating: parseInt(req.body.rating),
			photos: splitArray(req.body.photos),
			price_level: parseInt(req.body.price_level),
			types: splitArray(req.body.types),
			formatted_address: req.body.formatted_address,
			geometry: {
				coordinates: [
					parseFloat(req.body.lng), 
					parseFloat(req.body.lat)
				]
			}
		}, (err, restaurant) => {
			if (err) {
				console.log('Error creating restaurant')
				res
					.status(400)
					.json(err)
			} else {
				console.log('Restaurant created', restaurant)
				res
					.status(201)
					.json(restaurant)
			}
		})
}

// Updating a document
module.exports.restaurantsUpdateOne = (req, res) => {
	const restaurantId = req.params.restaurantId
	console.log('Get restaurantID', restaurantId)

	Restaurant
		.findById(restaurantId)
		// To exclude fields from update, in this case sub docs
		.select('-reviews')
		.exec((err, doc) => {
			let response = {
				status: 200,
				message: doc
			}
			if (err) {
				console.log('Error finding restaurant')
				response.status = 500
				response.message = err
			} else if (!doc) {
				console.log('RestaurantId not found in database', restaurantId)
				response.status = 404
				response.message = {
					'message' : `Restaurant ID ${restaurantId} not found`
				}
			} 
			if (response.status !== 200) {
				res
					.status(response.status)
					.json(response.message)											
			} else {
				doc.name = req.body.name,
				doc.rating = parseInt(req.body.rating),
				doc.photos = splitArray(req.body.photos),
				doc.price_level = parseInt(req.body.price_level),
				doc.types = splitArray(req.body.types),
				doc.formatted_address = req.body.formatted_address,
				doc.geometry = {
					coordinates: [
						parseFloat(req.body.lng), 
						parseFloat(req.body.lat)
					]
				}

				doc.save((err, restaurantUpdated) => {
					if (err) {
						res
							.status(500)
							.json(err)
					} else {
						res
							// Successfull but no content
							.status(204)
							.json()
					}
				})				
			}
		})	
}

// Deleting a document
module.exports.restaurantsDeleteOne = (req, res) => {
	const restaurantId = req.params.restaurantId

	Restaurant
		.findByIdAndRemove(restaurantId)
		.exec((err, restaurant) => {
			if (err) {
				res
					.status(404)
					.json(err)
			} else {
				console.log('Restaurant deleted, ID:', restaurantId)
				res
					.status(204)
					.json()
			}
		})		
}














