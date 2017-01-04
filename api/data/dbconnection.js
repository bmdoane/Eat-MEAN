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
// Log for stopping Nodemon with CTRL-C
process.on('SIGINT', () => {
	mongoose.connection.close(() => {
  	console.log('Mongoose disconnected through app termination (SIGINT)')
    process.exit(0)
  })
})
// Log for Heroku
process.on('SIGTERM', () => {
	mongoose.connection.close(() => {
  	console.log('Mongoose disconnected through app termination (SIGTERM)')
    process.exit(0)
  })
})
// For Nodemon restarts
process.once('SIGUSR2', () => {
	mongoose.connection.close(() => {
  	console.log('Mongoose disconnected through app termination (SIGUSR2)')
    process.kill(process.pid, 'SIGUSR2')
  })
})