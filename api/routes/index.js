'use strict'

const { Router } = require('express')
const router = Router()
const { restaurantsGetAll, restaurantsGetOne, restaurantsAddOne, restaurantsUpdateOne, restaurantsDeleteOne } = require('../controllers/restaurantsCtrl')
const { reviewsGetAll, reviewsGetOne, reviewsAddOne, reviewsUpdateOne, reviewsDeleteOne } = require('../controllers/reviewsCtrl')
const { register, login, authenticate } = require('../controllers/userCtrl')

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
	.post(authenticate, reviewsAddOne)

router
	.route('/restaurants/:restaurantId/reviews/:reviewId')
	.get(reviewsGetOne)	
	.put(reviewsUpdateOne)
	.delete(reviewsDeleteOne)

// Authentication
router
	.route('/users/register')
	.post(register)	

router
	.route('/users/login')
	.post(login)			
		
module.exports = router