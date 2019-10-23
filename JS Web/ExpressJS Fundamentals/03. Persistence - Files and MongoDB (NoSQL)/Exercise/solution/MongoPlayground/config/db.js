const mongoose = require('mongoose');

module.exports = () => {
    //TODO:
    let connectionString = 'mongodb://localhost:27017/mongo-db-playground'
    mongoose.connect(connectionString, { useNewUrlParser: true }, err => {
        if (err) {
            console.log(err)
        }
    })


}