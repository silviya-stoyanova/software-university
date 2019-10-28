const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
    usePushEach: true
})

const Team = mongoose.model('Team', TeamSchema)
module.exports = Team   