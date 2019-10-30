const mongoose = require('mongoose')
const encryption = require('./../utilities/encryption')

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Course'
    }],
    roles: [{
        type: String
    }],
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, {
    usePushEach: true
})


userSchema.method({
    authenticate: function (password) {
        let inputPasswordHash = encryption.hashPassword(password, this.salt)
        let isSamePasswordHash = inputPasswordHash === this.passwordHash
        return isSamePasswordHash
    },

    isInRole: function (role) {
        return this.roles.indexOf(role) !== -1
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User

User.seedAdmin = async () => {
    try {
        let users = await User.find()
        if (users.length > 0) return
        const salt = encryption.generateSalt()
        const passwordHash = encryption.hashPassword('admin', salt)
        return User.create({
            salt,
            username: 'admin',
            passwordHash,
            fullName: 'Admin Adminov',
            roles: ['Admin']
        })
    } catch (e) {
        console.log(e)
    }
}