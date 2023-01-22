// forgot password delete user
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const Ride = require('./../models/rideModel')
const { validate } = require('./../models/userModel')

exports.forgotPassword = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        res.status(404).json({
            status: 'failed',
            message: 'you entered wrong email '
        })
    }
    const resetToken = user.createPasswordRestToken()
    await user.save({ validateBeforeSave: false })
}


