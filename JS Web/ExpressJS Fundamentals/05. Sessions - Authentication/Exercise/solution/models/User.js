const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
    username: { type: mongoose.Schema.Types.String, required: true, unique: true },
    hashedPass: { type: mongoose.Schema.Types.String, required: true },
    firstName: { type: mongoose.Schema.Types.String },
    lastName: { type: mongoose.Schema.Types.String },
    salt: { type: mongoose.Schema.Types.String, required: true },
    roles: [{ type: mongoose.Schema.Types.String }]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashedPass;
    }
});

const User = mongoose.model('User', userSchema);
// TODO: Create an admin at initialization here

User.seedAdminUser = async function () {

    let users = await User.find()
    users = users.filter(u => u.roles.indexOf('Admin') > -1)
    let salt = encryption.generateSalt()
    let hashedPass = encryption.generateHashedPassword(salt, 'az')

    if (users.length === 0) {
        return User.create({
            username: 'admin',
            hashedPass,
            firstName: 'Adminka',
            lastName: 'Nqma',
            salt,
            roles: ['Admin'],
        })
    }
}

module.exports = User;
