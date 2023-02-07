const Ride = require('./../models/rideModel')

exports.bookRide = async (req, res) => {
    try {

        const ride = await Ride.create(req.body)
        res.status(201).json({
            mssg: 'your ride has been sucessfully booked',
            ride

        })
    } catch (err) {
        res.status(404).json({
            mssg: 'failed try again',
            mssg: err.message
        })
    }

}