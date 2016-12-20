'use strict'
const restaurantData = require('../data/restaurantSeed.json')

module.exports.restaurantsGetAll = (req, res) => {
		console.log("Get restaurants")
		res
			.status(200)
			.json(restaurantData)
}

module.exports.restaurantsGetOne = (req, res) => {
		console.log("req.params", req.params)
		const restaurantId = req.params.restaurantId
		const thisRestaurant = restaurantData[restaurantId]
		console.log("Get restaurantID", restaurantId)
		res
			.status(200)
			.json(thisRestaurant)
}