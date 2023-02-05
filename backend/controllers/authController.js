// forgot password delete user
const jwt = require('jsonwebtoken')
const User = require('./../models/userModel')
const Ride = require('./../models/rideModel')
const { promisify } = require('util')
const { validate } = require('./../models/userModel')
const sendEmail = require('./../utils/email')
const crypto = require('crypto')
// const promisify = require('promisify')

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    })

}
const cookieOption = {
    Expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRESIN * 24 * 60 * 60 * 1000),


    HttpOnly: true
}
if (process.env.NODE_ENV === 'production') {
    cookieOption.Secure = true
}
const createToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    res.cookie('jwt', token, cookieOption)
    res.status(statusCode).json({
        mssg: 'token send sucessfully',
        token
    })
}
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

    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/forgotPassword${resetToken}`
    const message = ` Forgot your password? don't worry reset your password here by clicking the link below ${resetUrl} and if you didn't forgot your password then please ignore this`
    try {

        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for only 2 minutes)',
            message
        })
        res.status(200).json({
            status: 'sucess',
            message: 'Token sent to email'
        })
    } catch (err) {
        user.passwordRestToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })
        console.log(err);
        return next(new appError('failed to send email please try again later', 500))
    }

}

// reset password 

exports.resetPassword = async (req, res) => {
    const hashToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        passwordRestToken: hashToken,
        passwordResetExpires: { $gt: Date.now() }

    })
    if (!user) {
        res.status(500).json({
            status: 'failed user not found'
        })
    }
    user.createPassword = req.body.password,
        user.passwordConfirm = req.body.passwordConfirm
    passwordRestToken: undefined
    passwordResetExpires: undefined
    await user.save()
    const token = signToken(user._id)
    res.status(200).json({
        status: 'sucess',
        message: 'password changed sucessfully',
        token
    })

}

exports.protect = async (req, res, next) => {
    // Getting the token and checking if it is presnet there or not ?
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        res.status(500).json({
            status: 'failed user not found'
        })
    }

    //Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    // check if the user still exists
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
        res.status(500).json({
            status: 'failed user not found'
        })
    }

    //check if user changed pass after the token issued

    // if (!freshUser.changePassword(decoded.iat)) {
    //     return next(new appError('User recently changed password check again', 401))
    // }

    // GRANT ACESS TO PROTECTED ROUTE
    req.user = freshUser
    next()


}



exports.restrict = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(500).json({
                status: 'failed',
                message: 'opps you are not the appropriate person'

            })
        }
        next()
    }
}