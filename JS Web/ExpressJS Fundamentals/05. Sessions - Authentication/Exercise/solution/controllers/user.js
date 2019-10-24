const User = require('../models/User')
const Rent = require('../models/Rent')
const encryption = require('../util/encryption')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register')
    },

    registerPost: async (req, res) => {
        let usernameIsTaken = await User.find({ username: req.body.username }).length > 0

        if (usernameIsTaken) {
            req.body.error = 'This username is already taken. Please choose another one.'
            return res.render('user/register', req.body)
        }

        if (!req.body.username) {
            req.body.error = 'Please enter your username.'
            return res.render('user/register', req.body)
        }

        if (req.body.password !== req.body.repeatPassword) {
            req.body.error = 'Both passwords must match.'
            return res.render('user/register', req.body)
        }

        let salt = encryption.generateSalt()
        let hashedPass = encryption.generateHashedPassword(salt, req.body.password)

        let newUser = await new User({
            username: req.body.username,
            hashedPass,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            salt,
            roles: ['User'],
        }).save()

        req.login(newUser, (err, user) => {
            if (err) {
                console.log(err)
            }
        })
        res.redirect('/')
    },

    loginGet: (req, res) => {
        res.render('user/login')
    },

    loginPost: async (req, res) => {
        let user = await User.findOne({ username: req.body.username })

        if (!req.body.username || !req.body.password) {
            req.body.error = 'All fields must be filled!'
            return res.render('user/login', req.body)
        }

        if (!user) {
            req.body.error = 'Invalid username!'
            return res.render('user/login', req.body)
        }

        if (!user.authenticate(req.body.password)) {
            req.body.error = 'Invalid password!'
            return res.render('user/login', req.body)
        }

        req.login(user, (err, user) => {
            if (err) {
                console.log(err)
            }
        })
        res.redirect('/')
    },

    logout: (req, res) => {
        req.logout()
        res.redirect('/')
    },

    rentsGet: async (req, res) => {
        let rents = await Rent.find().populate('car')
        rents = rents.filter(r => r.owner.toString() === req.user._id.toString())
        rents.map(r => r.car.expiresOn = r.days)
        res.render('user/rented', { cars: rents })
    }
};