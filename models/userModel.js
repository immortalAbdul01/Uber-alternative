const mongoose = require('mongoose')
const validator = require('validator')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            validate: [validator.isEmail]
        },
        role: {
            type: String,
            default: 'passenger',
            enum: ['driver', 'passenger']
        },
        gender: {
            type: String,
            required: true,
            enum: ["male", 'female', 'other']
        },
        photo: {
            type: String
        },
        createPassword: {
            type: String,

            required: true,
            minlength: 6,
        },
        passwordConfirm: {
            type: String,
            validate: {
                validator: function (el) {
                    return el === this.createPassword
                },
                message: 'the passwords are not same'
            }
        },
        passwordChangeAt: Date,
        passwordRestToken: String,
        passwordResetExpires: Date,
        updatePassword: String,
    }


)
userSchema.pre('save', async function (next) {
    if (!this.isModified('createPassword')) return next()
    this.createPassword = await bcrypt.hash(this.createPassword, 12)
    this.passwordConfirm = undefined
    next()
})
userSchema.methods.correctPassword = (async function (candidatePassword, password) {
    return await bcrypt.compare(candidatePassword, password)
})
userSchema.methods.createPasswordRestToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordRestToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({ resetToken }, this.passwordRestToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000
    return resetToken
}
const User = mongoose.model('user', userSchema)
module.exports = User