'use strict'

const { MongoClient } = require('mongodb')
const MONGODB_URL = 'mongodb://localhost:27017/meanRestaurant'

let _connection = null

// Method to store connection
let open = () => {
	// Callback first arg handles error, second is database
	MongoClient.connect(MONGODB_URL, (err, db) => {
		if (err) {
			console.log('DB connection failed')
			return
		}
		_connection = db
		console.log('DB connection open')
	})
}

// Method to return connection
let get = () => {
	return _connection
}

module.exports = {
	open : open,
	get : get
}