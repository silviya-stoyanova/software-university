const mongoose = require('mongoose');
const User = require('../models/User')
mongoose.Promise = global.Promise;

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) {
            return console.log(err);
        }

        User.seedAdminUser()
            .then(console.log('Database is ready!'))
            .catch(err => console.log('There is a trouble during seedAdminUser() at config/database.js'))
    });

    db.on('error', reason => {
        console.log(reason);
    });
};