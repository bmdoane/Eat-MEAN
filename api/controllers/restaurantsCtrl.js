'use strict'
const restaurantData = require('../data/restaurantSeed.json')

module.exports.restaurantsGetAll = (req, res) => {
		console.log("Get restaurants")
		console.log("req.query", req.query)
		// Setting querystring params, limiting data return for pagination
		let offset = 0
		let count = 0

		if (req.query && req.query.offset) {
			offset = parseInt(req.query.offset, 10)
		}

		if (req.query && req.query.count) {
			count = parseInt(req.query.count, 10)
		}

		const returnData = restaurantData.slice(offset, offset + count)		

		res
			.status(200)
			.json(returnData)
}

module.exports.restaurantsGetOne = (req, res) => {
		const restaurantId = req.params.restaurantId
		const thisRestaurant = restaurantData[restaurantId]
		console.log("Get restaurantID", restaurantId)
		res
			.status(200)
			.json(thisRestaurant)
}

module.exports.restaurantsAddOne = (req, res) => {
	console.log("Post new restaurant")
	console.log("req.body", req.body)
		res
			.status(200)
			.json(req.body)	
}







