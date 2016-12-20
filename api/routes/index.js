'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne } = require('../controllers/restaurantsCtrl')

router
	.route('/restaurants')
	.get(restaurantsGetAll)

router
	.route('/restaurants/:restaurantId')
	.get(restaurantsGetOne)

module.exports = router