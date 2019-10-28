module.exports = {
    isAuthed: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },

    hasRole: (role) => {
        return (req, res, next) => {
            if (req.user && req.user.roles.indexOf(role) > -1) {
                next();
            } else {
                res.redirect('/user/login');
            }
        }
    },

    isGuest: (req, res, next) => {
        if (!req.user) {
            next()
        } else {
            res.redirect('/')
        }
    }
}