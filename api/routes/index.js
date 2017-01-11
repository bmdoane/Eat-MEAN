'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne, restaurantsAddOne } = require('../controllers/restaurantsCtrl')
const { reviewsGetAll, reviewsGetOne, reviewsAddOne } = require('../controllers/reviewsCtrl')

router
	.route('/restaurants')
	.get(restaurantsGetAll)
	.post(restaurantsAddOne)

router
	.route('/restaurants/:restaurantId')
	.get(restaurantsGetOne)

// Reviews routes
router
	.route('/restaurants/:restaurantId/reviews')
	.get(reviewsGetAll)
	.post(reviewsAddOne)

router
	.route('/restaurants/:restaurantId/reviews/:reviewId')
	.get(reviewsGetOne)	

module.exports = router