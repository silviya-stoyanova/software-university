const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true, maxlength: 50 },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
}, {
    usePushEach: true
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project