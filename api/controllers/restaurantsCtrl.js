'use strict'

const { get } = require('../data/dbconnection.js')
const { ObjectId } = require('mongodb')
const restaurantData = require('../data/restaurantSeed.json')

module.exports.restaurantsGetAll = (req, res) => {

	const db = get()
	const collection = db.collection('restaurants')

	let offset = 0
	let count = 5

	if (req.query && req.query.offset) {
		offset = parseInt(req.query.offset, 10)
	}

	if (req.query && req.query.count) {
		count = parseInt(req.query.count, 10)
	}
	
	collection
		.find()
		.skip(offset)
		.limit(count)
		.toArray((err, docs) => {
			console.log('Found restaurants', docs)
			res
				.status(200)
				.json(docs)		
		})

}

module.exports.restaurantsGetOne = (req, res) => {
	const db = get()
	const collection = db.collection('restaurants')

	const restaurantId = req.params.restaurantId
	console.log("Get restaurantID", restaurantId)
	collection
		.findOne({
			_id : ObjectId(restaurantId)
		}, (err, doc) => {
			res
				.status(200)
				.json(doc)			
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







