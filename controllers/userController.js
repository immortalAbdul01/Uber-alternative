const User = require('./../models/userModel')

// const Driver = require('./../models/driverModel')
const jwt = require('jsonwebtoken')



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

exports.signIn = async (req, res) => {
    try {


        const user = await User.create(req.body)

        // createToken(user, 201, res)
        res.status(201).json({
            mssg: 'sucess',

            data: {
                user
            }

        })
    } catch (err) {
        res.status(404).json({
            mssg: 'failed',
            mssg: err.message
        })
    }

}
exports.login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select('+createPassword')
    if (!await user.correctPassword(password, user.createPassword)) {
        res.status(404).json({
            mssg: 'something went wrong'
        })

    }

    const token = signToken(user._id)
    res.status(200).json({
        mssg: 'logged in sucessfully',
        token
    })

}

exports.getAlluser = async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        mssg: 'sucess',
        data: users
    })
}
exports.singleUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)
        res.status(200).json({
            mssg: 'sucess',
            user
        })
    } catch (err) {
        res.status(404).json({
            mssg: err.message
        })
    }
}

exports.getFemaleDriver = async (req, res) => {
    try {

        const users = await User.find({ role: 'driver', gender: 'female' }

        )
        res.status(200).json({
            status: 'sucess',
            message: 'all users',
            data: users
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
