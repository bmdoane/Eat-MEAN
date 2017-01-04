'use strict'

const mongoose = require('mongoose')
const MONGODB_URL = 'mongodb://localhost:27017/meanRestaurant'

mongoose.connect(MONGODB_URL)

mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${MONGODB_URL}`)
})

mongoose.connection.on('disconnected', () => {
	console.log(`Mongoose disconnected`)
})

mongoose.connection.on('error', (err) => {
	console.log(`Mongoose connection error: ${err}`)
})

// Listen for events in the NODE process
