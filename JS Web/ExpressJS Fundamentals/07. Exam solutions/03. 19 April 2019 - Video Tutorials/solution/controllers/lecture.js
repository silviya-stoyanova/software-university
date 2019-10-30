const Lecture = require('../models/Lecture')
const Course = require('../models/Course')

module.exports = {
    createGet: async (req, res) => {
        const course = await Course.findById(req.params.courseId)
        const lectures = await Lecture.find({ course: req.params.courseId })
        res.render('lecture/create', { courseId: req.params.courseId, courseTitle: course.title, lectures })
    },

    createPost: async (req, res) => {
        const { title, videoUrl } = req.body

        if (!title || !videoUrl || !title.trim().length || !videoUrl.trim().length) {
            res.render('lecture/create', { courseId: req.params.courseId, lectures: req.body })
        }

        req.body.course = req.params.courseId
        const lecture = await Lecture.create(req.body)

        const course = await Course.findById(req.params.courseId)
        course.lectures = [...course.lectures, lecture._id]
        await course.save()
        res.redirect('/')
    },

    remove: async (req, res) => {
        const lecture = await Lecture.findById(req.params.lectureId)
        lecture.remove()

        const course = await Course.findOne({ lectures: req.params.lectureId })
            .populate('lectures')

        const newData = course.lectures.filter(lecture => {
            return lecture._id != req.params.lectureId
        })

        await Course.findByIdAndUpdate(req.params.courseId, { lectures: [...newData] })
        res.redirect('/')
    },

    play: async (req, res) => {
        const lecture = await Lecture.findById(req.params.lectureId)
        const course = await Course.findById(req.params.courseId)
            .populate('lectures')

        return res.render('lecture/play', { lecture, course })
    }
}