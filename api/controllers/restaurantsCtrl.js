'use strict'

const mongoose = require('mongoose')
const Restaurant = mongoose.model('Restaurant')

// Trouble getting geoNear to work.  Concerns with MongoDB data, model and this method.
// const runGeoQuery = (req, res) => {

// 	let lng = parseFloat(req.query.lng)
// 	let lat = parseFloat(req.query.lat)

// 	// A geoJSON point
// 	let point = {
// 		type: "Point",
// 		coordinates: [lng, lat]
// 	}

// 	let geoOptions = {
// 		spherical: true,
// 		maxDistance: 200000,
// 		num: 5
// 	}

// 	Restaurant
// 		.geoNear(point, geoOptions, function(err, results, stats) {
// 			console.log("point", point)
// 			console.log("geoOptions", geoOptions)
// 			console.log("results", results)
// 			console.log("stats", stats)
// 			res
// 				.status(200)
// 				.json(results)
// 		})

// }

module.exports.restaurantsGetAll = (req, res) => {

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
				"message" : "If supplied in querystring, count and offset should be a number"
			})
		return
	}

	if (count > maxCount) {
		res 
			.status(400)
			.json({
				"message" : `Count limit of ${maxCount} exceeded`
			})
		return
	}
	
	Restaurant
		.find()
		.skip(offset)
		.limit(count)		
		.exec((err, restaurants) => {
			if (err) {
				console.log("Error finding hotels")
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
	console.log("Get restaurantID", restaurantId)

	Restaurant
		.findById(restaurantId)
		.exec((err, doc) => {
			let response = {
				status: 200,
				message: doc
			}
			if (err) {
				console.log('Error finding hotel')
				response.status = 500
				response.message = err
			} else if (!doc) {
				response.status = 404
				response.message = {
					"message" : "Hotel ID not found"
				}
			}
			res
				.status(response.status)
				.json(response.message)							
		})
}

module.exports.restaurantsAddOne = (req, res) => {
	const db = get()
	const collection = db.collection('restaurants')
	let newRestaurant

	console.log("Post new restaurant")

	if (req.body && req.body.name && req.body.rating) {
		newRestaurant = req.body
		newRestaurant.rating = parseInt(req.body.rating, 10)
		collection.insertOne(newRestaurant, (err, response) => {
			console.log(response.ops)
			res
				.status(201)
				.json(response.ops)						
		})
	} else {
		console.log("Data missing from body")
		res
			.status(400)
			.json({ message: "Required data missing from body" })
	}
}







