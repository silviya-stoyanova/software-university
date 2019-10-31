const Thread = require('../models/Thread')
const Message = require('../models/Message')
const User = require('../models/User')

module.exports = {
    findThread: async (req, res) => {
        // check if the user wants to chat with themselves..
        if (req.user.username === req.body.username) {
            console.log('You cannot chat with yourself!');
            return res.redirect(`/`)
        }

        // check if this user exists
        let otherUser = await User.find({ username: req.body.username })
        // find a thread with eigher the logged in user or the otherOne
        let thread = await Thread.find({ users: { $in: [req.user.username, req.body.username] } })
        // find the right thread between them both

        thread = thread.filter(t => {
            return t.users.indexOf(req.user.username) > -1 &&
                t.users.indexOf(req.body.username) > -1
        })

        if (otherUser.length === 0) {
            console.log('This user is not registered!');
            return res.redirect(`/`)
        }

        if (thread.length === 0) {
            thread = await Thread.create({ users: [req.user.username, req.body.username] })
        }

        res.redirect(`/thread/${req.body.username}`)
    },

    getChatroom: async (req, res) => {
        let otherUser = req.params.otherUser
        let userInfo = await User.findById(req.user._id)
        let otherUserInfo = await User.findOne({ username: otherUser })
        let thread = await Thread.find({ users: { $in: [req.user.username, otherUser] } })

        thread = thread.filter(t => {
            return t.users.indexOf(req.user.username) > -1 &&
                t.users.indexOf(otherUser) > -1
        })
        thread = thread[0]
        thread.otherUser = otherUser

        let messages = await Message.find({ thread: thread._id })

        messages.map(m => {
            if (m.user.toString() === req.user._id.toString()) {
                m.align = 'left'    // if I am the receiver
            } else {
                m.align = 'right'   // if I am the sender
            }

            // if this message contains an image
            if (m.content.match(/^(http(s)*:\/\/)(.+)[\.jpegpn]/)) {
                m.isImage = true
            }
        })

        // if the otherUser is among the my blockedList
        if (userInfo.blockedUsers.indexOf(otherUserInfo._id) > -1) {
            thread.otherUserIsBlocked = true
        } else {
            thread.otherUserIsBlocked = false
        }

        // if I am among the otherUser's blockedList
        if (otherUserInfo.blockedUsers.indexOf(req.user._id) > -1) {
            thread.iAmBlocked = true
        } else {
            thread.iAmBlocked = false
        }

        res.render('thread/details', { messages, thread })
    },

    postChatroom: async (req, res) => {
        // create new Message
        let receiver = await User.findOne({ username: req.params.otherUser })

        Message.create({
            content: req.body.message,
            user: receiver._id,
            thread: req.body.threadId
        })
        res.redirect(`/thread/${receiver.username}`)
    },

    blockUser: async (req, res) => {
        let otherUser = req.params.otherUser
        let otherUserInfo = await User.findOne({ username: otherUser })

        let user = await User.findById(req.user._id)
        user.blockedUsers.push(otherUserInfo._id)
        user.save()
        res.redirect('back')
    },

    unblockUser: async (req, res) => {
        let otherUser = req.params.otherUser
        let otherUserInfo = await User.findOne({ username: otherUser })

        let user = await User.findById(req.user._id)
        let blockedUserIndex = user.blockedUsers.indexOf(otherUserInfo._id)
        user.blockedUsers.splice(blockedUserIndex, 1)

        user.save()
        res.redirect('back')
    },

    deleteThread: async (req, res) => {
        console.log('deleting...');

        let messages = await Message.find({ thread: req.params.threadId })
        messages.map(m => m.remove())

        let thread = await Thread.findById(req.params.threadId)
        thread.remove()

        res.redirect('/')
    }
}