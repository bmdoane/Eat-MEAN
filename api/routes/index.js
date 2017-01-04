'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne, restaurantsAddOne } = require('../controllers/restaurantsCtrl')
const { reviewsGetAll, reviewsGetOne } = require('../controllers/reviewsCtrl')

router
	.route('/restaurants')
	.get(restaurantsGetAll)

router
	.route('/restaurants/:restaurantId')
	.get(restaurantsGetOne)

router
	.route('/restaurants/new')
	.post(restaurantsAddOne)

// Reviews routes
router
	.route('/restaurants/:restaurantId/reviews')
	.get(reviewsGetAll)

router
	.route('/restaurants/:restaurantId/reviews/:reviewId')
	.get(reviewsGetOne)	

module.exports = router