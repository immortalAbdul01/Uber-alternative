const express = require('express')
const rideController = require('./../controllers/rideController')
const router = express.Router()
router.post('/book', rideController.bookRide)
module.exports = router