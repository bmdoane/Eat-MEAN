'use strict'

require('./api/data/dbconnection.js')
const express = require('express')
const app = express()
const path = require('path')
const { urlencoded } = require('body-parser')

const routes = require('./api/routes')

const port = process.env.PORT || 3000
app.set('port', port)

// MIDDLEWARE - Sit between request and response.  Order matters.
// This shows what is method is being called and what endpoint loading a page.  You can add directory as arg before anon func, to specify. 
app.use((req, res, next) => {
	console.log(req.method, req.url)
	next()
})
// Setting static directory.  path.join to avoid syntactic issues of direct restructures on different operating systems.
app.use(express.static(path.join(__dirname, 'public')))
// Only need strings and arrays from form body
app.use(urlencoded({ extended: false }))

app.use('/api', routes)

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
