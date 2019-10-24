const Car = require('../models/Car')
const Rent = require('../models/Rent')

module.exports = {
    allGet: async (req, res) => {
        let cars = await Car.find()
        let filterStr = req.query.model

        if (filterStr) {
            cars = cars.filter(car => car.model.toLowerCase().includes(filterStr.toLowerCase()))
        }

        cars = cars.filter(car => car.isRented === false)
        cars = cars.sort((a, b) => a.pricePerDay - b.pricePerDay)
        res.render('car/all', { cars })
    },

    addGet: (req, res) => {
        res.render('car/add')
    },

    addPost: (req, res) => {
        if (!req.body.model || !req.body.image || !req.body.pricePerDay) {
            req.body.error = 'Please fill in all fields!'
            return res.render('car/add', req.body)
        }

        Car.create(req.body)
        res.redirect('/car/all')
    },

    editGet: async (req, res) => {
        let car = await Car.findById(req.params.carId)
        res.render('car/edit', car)
    },

    editPost: async (req, res) => {
        if (!req.body.model || !req.body.image || !req.body.pricePerDay) {
            req.body.error = 'Please fill in all fields!'
            return res.render('car/edit', req.body)
        }

        let car = await Car.findById(req.params.carId)
        car.model = req.body.model
        car.image = req.body.image
        car.pricePerDay = req.body.pricePerDay
        car.save()
        res.redirect('/car/all')
    },

    rentGet: async (req, res) => {
        let car = await Car.findById(req.params.carId)

        if (car.isRented) {
            return res.redirect('/car/all')
        }

        res.render('car/rent', car)
    },

    rentPost: async (req, res) => {
        // update the car -> isBought = true
        // create a new Rent
        let car = await Car.findById(req.params.carId)

        if (car.isRented) {
            return res.redirect('/car/all')
        }

        car.isRented = true
        await car.save()

        Rent.create({
            days: req.body.days,
            car: req.params.carId,
            owner: req.user._id,
        })

        res.redirect('/user/rents')
    }
}