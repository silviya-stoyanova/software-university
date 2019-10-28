const Article = require('../models/Article')
const User = require('../models/User')

module.exports = {
    createGet: (req, res) => {
        res.render('article/create')
    },

    createPost: async (req, res) => {
        let article = req.body
        article.author = req.user._id
        article.date = Date.now()
        let articleInfo = await Article.create(article)

        let user = await User.findById(req.user._id)
        user.articles.push(articleInfo._id)
        user.save()

        res.redirect('/')
    },

    detailsGet: async (req, res) => {
        let article = await Article.findById(req.params.articleId).populate('author')

        try {
            article.isAuth = req.user.isAuthor(article) || req.user.isInRole('Admin')
        } catch (err) {
            // console.log(err)
        }

        res.render('article/details', article)
    },

    editGet: async (req, res) => {
        let article = await Article.findById(req.params.articleId)
        res.render('article/edit', article)
    },

    editPost: async (req, res) => {
        // let article = res.body
        let article = await Article.findById(req.params.articleId)
        article.title = req.body.title
        article.content = req.body.content
        article.save()
        res.redirect('/')
    },

    deleteGet: async (req, res) => {
        let article = await Article.findById(req.params.articleId)
        res.render('article/delete', article)
    },

    deletePost: async (req, res) => {
        // let article = res.body
        let article = await Article.findById(req.params.articleId)
        article.remove()
        res.redirect('/')
    }
}