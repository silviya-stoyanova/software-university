const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    roles: [{
        type: mongoose.Schema.Types.String,
        enum: ['Admin', 'user']
    }],
    blockedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    salt: {
        type: String,
        required: true
    }
}, {
    usePushEach: true
});


userSchema.method({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt);
        let isSamePasswordHash = inputPasswordHash === this.passwordHash;
        return isSamePasswordHash;
    },

    isAuthor: function (item) {
        if (!item) {
            return false;
        }

        let isAuthor = item.author.equals(this._id);  // or id ?

        return isAuthor;
    },

    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

User.seedAdmin = async () => {
    try {
        let users = await User.find();
        if (users.length > 0) return;
        const salt = encryption.generateSalt();
        const passwordHash = encryption.hashPassword('admin', salt);
        return User.create({
            username: 'admin',
            firstName: 'adminka',
            lastName: 'adminkova',
            roles: ['Admin'],
            blockedUsers: [],
            passwordHash,
            salt,
        });
    } catch (err) {
        console.log(err);
    }
};