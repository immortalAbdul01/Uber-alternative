const express = require('express')
const rideController = require('./../controllers/rideController')
const driverController = require('./../controllers/driverController')
const authController = require('./../controllers/authController')
const router = express.Router()
router.post('/book', rideController.bookRide)
router.post('/becomeDriver', authController.protect, driverController.becomeDriver)
module.exports = router