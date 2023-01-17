const userController = require('./../controllers/userController')
const express = require('express')
const router = express.Router()
router.post('/sign', userController.signIn)
router.get('/getUsers', userController.getAlluser)
router.get('/getUsers/:id', userController.singleUser)
router.post('/login', userController.login)

module.exports = router