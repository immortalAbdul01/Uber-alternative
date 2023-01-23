const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const express = require('express')
const router = express.Router()
router.post('/sign', userController.signIn)
router.get('/getUsers', userController.getAlluser)
router.get('/getUsers/:id', userController.singleUser)
router.post('/login', userController.login)
router.post('/forgotPassword', authController.forgotPassword)

module.exports = router