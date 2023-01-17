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
const User = mongoose.model('user', userSchema)
module.exports = User