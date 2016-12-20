'use strict'
const restaurantsData = require('../data/restaurantSeed.json')

module.exports.restaurantsGetAll = (req, res) => {
		console.log("Get Restaurants")
		res
			.status(200)
			.json(restaurantsData)
}