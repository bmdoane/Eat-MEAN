'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne, restaurantsAddOne, restaurantsUpdateOne } = require('../controllers/restaurantsCtrl')
const { reviewsGetAll, reviewsGetOne, reviewsAddOne, reviewsUpdateOne } = require('../controllers/reviewsCtrl')

router
	.route('/restaurants')
	.get(restaurantsGetAll)
	.post(restaurantsAddOne)

router
	.route('/restaurants/:restaurantId')
	.get(restaurantsGetOne)
	.put(restaurantsUpdateOne)

// Reviews routes
router
	.route('/restaurants/:restaurantId/reviews')
	.get(reviewsGetAll)
	.post(reviewsAddOne)

router
	.route('/restaurants/:restaurantId/reviews/:reviewId')
	.get(reviewsGetOne)	
	.put(reviewsUpdateOne)
		
module.exports = router