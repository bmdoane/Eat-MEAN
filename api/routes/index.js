'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne, restaurantsAddOne } = require('../controllers/restaurantsCtrl')

router
	.route('/restaurants')
	.get(restaurantsGetAll)

router
	.route('/restaurants/:restaurantId')
	.get(restaurantsGetOne)

router
	.route('/restaurants/new')
	.post(restaurantsAddOne)	

module.exports = router