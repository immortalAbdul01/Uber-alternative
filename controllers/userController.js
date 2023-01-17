const User = require('./../models/userModel')


exports.signIn = async (req, res) => {
    const user = await User.create(req.body)

    res.status(201).json({
        mssg: 'sucess',
        user

    })

}