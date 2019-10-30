const mongoose = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],
    roles: [{
        type: mongoose.Schema.Types.String,
        enum: ['Admin', 'user']
    }]
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

        let isAuthor = item.edits[0].author.equals(this._id);

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
            salt,
            email: 'admin',
            passwordHash,
            roles: ['Admin']
        });
    } catch (e) {
        console.log(e);
    }
};