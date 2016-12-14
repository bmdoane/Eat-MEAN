'use strict'

const { Router } = require('express')
const router = Router()

router
	.route('/json')
	.get((req, res) => {
		console.log("Get JSON")
		res
			.status(200)
			.json( {"jsonData": true} )
	})
	.post((req, res) => {
		console.log("Post the JSON route")
		res
			.status(200)
			.json( {"jsonData": "Post received"} )
	})



module.exports = router