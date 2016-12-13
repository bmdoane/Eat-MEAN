'use strict'

const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 3000
app.set('port', port)

// MIDDLEWARE 
// Setting static directory.  path.join to avoid syntactic issues of direct restructures on different operating systems.
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {

})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
