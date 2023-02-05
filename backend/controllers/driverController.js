const User = require('./../models/userModel')
exports.becomeDriver = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user.role === 'driver') {
            res.status(404).json({
                status: 'failed',
                message: 'oops you are already a driver'
            })
        }
        user.role = 'driver'
        res.status(200).json({
            status: 'sucess',
            message: 'congratulations you are a driver now ',
            user
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message,

        })

    }


}