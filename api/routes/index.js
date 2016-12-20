'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll } = require('../controllers/restaurantsCtrl.js')

router
	.route('/restaurants')
	.get(restaurantsGetAll)

module.exports = router