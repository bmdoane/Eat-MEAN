'use strict'

const mongoose = require('mongoose')
const MONGODB_URL = 'mongodb://localhost:27017/meanRestaurant'

mongoose.connect(MONGODB_URL)

// Connection events
mongoose.connection.on('connected', () => {
	console.log(`Mongoose connected to ${MONGODB_URL}`)
})

mongoose.connection.on('disconnected', () => {
	console.log(`Mongoose disconnected`)
})

mongoose.connection.on('error', (err) => {
	console.log(`Mongoose connection error: ${err}`)
})

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function nodeProcessShutdown(msg, callback) {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`)
    callback()
  })
}

// For nodemon restarts
process.once('SIGUSR2', () => {
  nodeProcessShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2')
  })
})
// For app termination
process.on('SIGINT', () => {
  nodeProcessShutdown('App termination (SIGINT)', () => {
    process.exit(0)
  })
})
// For Heroku app termination
process.on('SIGTERM', () => {
  nodeProcessShutdown('App termination (SIGTERM)', () => {
    process.exit(0)
  })
})

// Bring in Schemas and Models
require('./restaurantModel.js')
