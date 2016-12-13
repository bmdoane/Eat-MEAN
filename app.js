'use strict'

const express = require('express')
const app = express()

const port = process.env.PORT || 3000
app.set('port', port)

app.get('/', (req, res) => {
	res.send('Hello Nurse!')
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
