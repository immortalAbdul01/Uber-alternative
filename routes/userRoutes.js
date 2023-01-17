const userController = require('./../controllers/userController')
const express = require('express')
const router = express.Router()
router.post('/', userController.signIn)

module.exports = router