'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne, restaurantsAddOne, restaurantsUpdateOne, restaurantsDeleteOne } = require('../controllers/restaurantsCtrl')
const { reviewsGetAll, reviewsGetOne, reviewsAddOne, reviewsUpdateOne, reviewsDeleteOne } = require('../controllers/reviewsCtrl')

router
	.route('/restaurants')
	.get(restaurantsGetAll)
	.post(restaurantsAddOne)

router
	.route('/restaurants/:restaurantId')
	.get(restaurantsGetOne)
	.put(restaurantsUpdateOne)
	.delete(restaurantsDeleteOne)

// Reviews routes
router
	.route('/restaurants/:restaurantId/reviews')
	.get(reviewsGetAll)
	.post(reviewsAddOne)

router
	.route('/restaurants/:restaurantId/reviews/:reviewId')
	.get(reviewsGetOne)	
	.put(reviewsUpdateOne)
	.delete(reviewsDeleteOne)	
		
module.exports = router