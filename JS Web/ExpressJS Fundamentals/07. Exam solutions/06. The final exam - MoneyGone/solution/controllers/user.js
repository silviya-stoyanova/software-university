const User = require('mongoose').model('User');
const encryption = require('./../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost: (req, res) => {
        let registerArgs = req.body;

        User.findOne({
            username: registerArgs.username
        }).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            }
            if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            }
            if (registerArgs.password.length < 8) {
                errorMsg = 'The password should be at least 8 characters long!'
            }
            if (registerArgs.username.length < 4 || !registerArgs.username.match(/^[A-Za-z0-9]+$/)) {
                errorMsg = 'The username should be at least 4 characters long and should consist only english letters and digits'
            }
            if (Number(registerArgs.amount) < 0) {
                errorMsg = 'The account amount should be positive number!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    username: registerArgs.username,
                    passwordHash: passwordHash,
                    salt: salt,
                    roles: ['User']
                };

                if (registerArgs.amount) {
                    userObject.amount = registerArgs.amount
                }

                User.create(userObject).then(user => {
                    req.logIn(user, (err) => {
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs);
                            return;
                        }
                        res.redirect('/');
                    })
                });
            }
        })
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {

        let loginArgs = req.body;
        User.findOne({
            username: loginArgs.username
        }).then(user => {
            if (!user || !user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.login(user, (err) => {
                if (err) {
                    res.render('/user/login', { error: err.message });
                    return;
                }

                let returnUrl = '/';
                if (req.session.returnUrl) {
                    returnUrl = req.session.returnUrl;
                    delete req.session.returnUrl;
                }
                res.redirect(returnUrl);
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    },

    profileGet: async (req, res) => {
        let user = await User.findById(req.user._id).populate('expenses')
        user.totalExpenses = 0

        user.expenses.map(e => {
            user.totalExpenses += e.total
        })
        res.render('user/profile', { user })
    },

    refill: async (req, res) => {
        await User.findByIdAndUpdate(req.user._id, {
            $inc: { amount: req.body.amount }

        }, (err, response) => {
            if (err) {
                console.log(err);
                req.body.error = err
                return // res.render('/', req.body)
            }
        })
        res.redirect('/')
    }
};