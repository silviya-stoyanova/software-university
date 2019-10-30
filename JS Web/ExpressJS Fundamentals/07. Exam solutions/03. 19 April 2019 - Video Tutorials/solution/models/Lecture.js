const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    course: { type: mongoose.SchemaTypes.ObjectId, ref: 'Course' },
})

const Lecture = mongoose.model('Lecture', lectureSchema)
module.exports = Lecture