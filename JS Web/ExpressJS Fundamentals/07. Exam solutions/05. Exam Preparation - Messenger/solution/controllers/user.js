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
                errorMsg = 'This username is already taken!';
            } else if (registerArgs.password !== registerArgs.confirmPassword) {
                errorMsg = 'Passwords do not match!'
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    username: registerArgs.username,
                    firstName: registerArgs.firstName,
                    lastName: registerArgs.lastName,
                    roles: ['user'],
                    blockedUsers: [],
                    passwordHash,
                    salt,
                };

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
        let user = await User.findById(req.user._id).populate('items')
        res.render('user/profile', { fullName: user.fullName, items: user.items })
    }
};