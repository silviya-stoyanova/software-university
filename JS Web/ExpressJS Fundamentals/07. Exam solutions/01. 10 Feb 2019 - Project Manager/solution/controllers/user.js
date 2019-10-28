const User = require('../models/User')
const Team = require('../models/Team')
const encryption = require('./../utilities/encryption')

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost: async (req, res) => {
        let registerArgs = req.body;
        let userExists = await User.findOne({ username: registerArgs.username })
        let errorMsg = '';

        if (userExists) {
            errorMsg = 'User with the same username exists!';
        }

        if (errorMsg) {
            registerArgs.error = errorMsg;
            return res.render('user/register', registerArgs)
        }

        let salt = encryption.generateSalt();
        let passwordHash = encryption.hashPassword(registerArgs.password, salt);

        let userObject = {
            username: registerArgs.username,
            passwordHash: passwordHash,
            firstName: registerArgs.firstName,
            lastName: registerArgs.lastName,
            profilePicture: registerArgs.profilePicture,
            salt: salt,
            roles: ['User']
        };

        let user = await User.create(userObject)

        await req.logIn(user, (err) => {
            if (err) {
                registerArgs.error = err.message;
                return res.render('user/register', registerArgs);
            }
        })
        res.redirect('/');
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
        let projects

        const user = await User.findById(req.user._id)
            .populate({
                path: 'teams',
                populate: { path: 'projects' }

            })

        if (user.teams[0]) {
            projects = user.teams[0].projects
        }

        res.render('user/profile', { user, projects })
    },

    leaveTeam: async (req, res) => {
        const teamId = req.params.teamId

        const user = await User.findById(req.user._id)
        user.teams = user.teams.filter(tId => tId != teamId)
        await user.save()

        const team = await Team.findById(teamId)
        team.members = team.members.filter(mId =>
            mId.toString() != req.user._id.toString())
        await team.save()

        res.redirect('/user/profile')
    }
};