const Item = require('../models/Item')
const User = require('../models/User')
const Edit = require('../models/Edit')

module.exports = {
    createGet: (req, res) => {
        res.render('item/create')
    },

    createPost: async (req, res) => {
        let itemInfo = await Item.create({
            title: req.body.title,
        })

        let editInfo = await Edit.create({
            author: req.user._id,
            content: req.body.content,
            item: itemInfo._id
        })

        itemInfo.edits = editInfo._id
        await itemInfo.save()

        let user = await User.findById(req.user._id)
        user.items.push(itemInfo._id)
        await user.save()

        res.redirect('/')
    },

    itemDetailsGet: async (req, res) => {
        let item = {}

        try {
            if (req.params.itemId === 'latest') {
                item = await Item.find().populate('edits')
                item = item.sort((a, b) => b.date - a.date)[0]

            } else {
                item = await Item.findById(req.params.itemId).populate('edits')
            }

            item.edits = item.edits.sort((a, b) => b.date - a.date)
            item.edits.content = item.edits[0].content.split('/r/n/r')

        } catch (err) {
            item = {}
            // load current edit's details
            let edit = await Edit.findById(req.params.itemId).populate('item')
            edit.title = edit.item.title
            edit.edits = { content: edit.content }

            Object.assign(item, edit)
            item._id = edit.item._id

            if (edit.item.locked) {
                item.locked = true
            }
        }

        console.log(item._doc);
        res.render('item/details', item)
    },

    allItemsGet: async (req, res) => {
        let items = await Item.find()
        items = items.sort((a, b) => a.title.localeCompare(b.title))
        res.render('item/all', { items })
    },

    historyGet: async (req, res) => {
        let item = await Item
            .findById(req.params.itemId)
            .populate({
                path: 'edits',
                populate: {
                    path: 'author'
                }
            })
        item.edits = item.edits.sort((a, b) => b.date - a.date)
        item.edits.forEach(edit => new Date(edit.date))
        res.render('item/history', item)
    },

    editGet: async (req, res) => {
        let item = await Item.findById(req.params.itemId).populate('edits')
        item.edits = item.edits.sort((a, b) => b.date - a.date)
        item.edits.content = item.edits[0].content

        // try {
        //     item.isAuth = req.user.isAuthor(item) || req.user.isInRole('Admin')
        // } catch (err) {
        //     console.log(err)
        // }


        //! if the article is locked - do stuff
        res.render('item/edit', item)
    },

    editPost: async (req, res) => {
        let editInfo = await Edit.create({
            author: req.user._id,
            content: req.body.content,
            item: req.params.itemId
        })

        let item = await Item.findById(req.params.itemId)
        item.edits.push(editInfo._id)
        await item.save()

        res.redirect('/')
    },

    lock: async (req, res) => {
        let item = await Item.findById(req.params.itemId)
        item.locked = true
        item.save()
        res.redirect(`/item/details/${req.params.itemId}`)
    },

    unlock: async (req, res) => {
        let item = await Item.findById(req.params.itemId)
        item.locked = false
        item.save()
        res.redirect(`/item/details/${req.params.itemId}`)
    }
}