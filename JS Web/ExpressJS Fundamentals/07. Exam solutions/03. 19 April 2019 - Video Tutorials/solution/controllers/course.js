const Course = require('../models/Course')
const User = require('../models/User')

module.exports = {
    createGet: (req, res) => {
        res.render('course/create')
    },

    createPost: async (req, res) => {
        let course = req.body

        let isPublicChecked = ''

        if (course.isPublic === 'on') {
            course.isPublic = true
            isPublicChecked = 'checked'
        } else {
            course.isPublic = false
        }

        const courseExists = await Course.findOne({ title: course.title })

        if (courseExists) {
            return console.log('This course is already in the database!')
        }
        if (!course.title || !course.description || !course.imageUrl) {
            course.isPublicChecked = isPublicChecked
            return res.render('course/create', course)
        }

        Course.create(course)
        res.redirect('/')
    },

    detailsGet: async (req, res) => {
        let course = await Course.findById(req.params.courseId).populate('lectures')
        console.log(course)
        console.log(req.user.courses)

        // try {
        // course.isAuth = req.user.isInRole('Admin')
        // } catch (err) {
        // // console.log(err)
        // }

        course.enrolledUsers.map(user => {
            if (user.toString() == req.user._id.toString()) {
                course.isEnrolled = true
            }
        })

        res.render('course/details', course)
    },

    enroll: async (req, res) => {
        let course = {}
        course.isEnrolled = true

        await User.findByIdAndUpdate(req.user._id,
            { $push: { courses: req.params.courseId } },

            (err, model) => {
                if (err) {
                    console.log(66, err)
                }
            }
        )

        await Course.findByIdAndUpdate(req.params.courseId, {
            $push: { enrolledUsers: req.user._id }

        }, (err, model) => {
            if (err) {
                return console.log(77, err)
            }

            Object.assign(course, model)
        })

        res.redirect('/course/details/' + req.params.courseId)
    },

    editGet: async (req, res) => {
        let course = await Course.findById(req.params.courseId)
        course.isPublic ? course.isPublicChecked = 'checked' : null
        res.render('course/edit', course)
    },

    editPost: async (req, res) => {
        let { title, description, imageUrl, isPublic } = req.body
        let isPublicChecked = ''

        if (isPublic === 'on') {
            isPublic = true
            isPublicChecked = 'checked'
        } else {
            isPublic = false
        }

        if (!title || !description || !imageUrl) {
            req.body.isPublicChecked = isPublicChecked
            return res.render('course/create', req.body)
        }

        let course = await Course.findById(req.params.courseId)
        course.title = title
        course.description = description
        course.imageUrl = imageUrl
        course.isPublic = isPublic
        course.save()
        res.redirect('/')
    },

    // deleteGet: async (req, res) => {
    //     let course = await Course.findById(req.params.courseId)
    //     res.render('course/delete', course)
    // },
    //
    // deletePost: async (req, res) => {
    //     let course = await Course.findById(req.params.courseId)
    //     course.remove()
    //     res.redirect('/')
    // }
}