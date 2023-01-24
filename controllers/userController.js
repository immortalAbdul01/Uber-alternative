const User = require('./../models/userModel')


exports.signIn = async (req, res) => {
    try {

        const user = await User.create(req.body)

        res.status(201).json({
            mssg: 'sucess',
            user

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
    else {
        res.status(200).json({
            mssg: 'logged in sucessfully'
        })
    }
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
