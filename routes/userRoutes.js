const userController = require('./../controllers/userController')
const express = require('express')
const router = express.Router()
router.post('/sign', userController.signIn)
router.post('/login', userController.login)

module.exports = router