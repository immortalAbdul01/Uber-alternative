const mongoose = require('mongoose')
const validator = require('validator')
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
        }
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
const User = mongoose.model('user', userSchema)
module.exports = User