const mongoose = require('mongoose')



const rideSchema = new mongoose.Schema({
    pickUplocation: {
        type: String,
        required: true
    }
    ,
    dropLocation: {
        type: String,
        required: true
    },
    selectDriver: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'

    }
})



const Ride = mongoose.model('ride', rideSchema)
module.exports = Ride