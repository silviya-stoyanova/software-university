const Team = require('../models/Team')
const User = require('../models/User')

module.exports = {
    allGet: async (req, res) => {
        let searchFilter = req.query.search
        let users = await User.find()
        let teams = await Team.find()
            .populate('members')
            .populate('projects')

        if (searchFilter) {
            teams = teams.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
        }

        res.render('team/all', { teams, users })
    },

    createGet: (req, res) => {
        res.render('team/create')
    },

    createPost: async (req, res) => {
        let team = req.body

        if (!team.name || !team.name.trim()) {
            console.log('Team name is required!')
            return res.render('/team/create', team)
        }

        let nameIsTaken = await Team.findOne({ name: team.name })

        if (nameIsTaken) {
            console.log('This team name is already taken!')
            return res.render('team/create', team)
        }

        await Team.create(team)
        res.redirect('/')
    },

    distribute: async (req, res) => {
        const userId = req.body.userId
        const teamId = req.body.teamId

        const user = await User.findById(userId)
        const team = await Team.findById(teamId)

        const userExists = team.members.find(member => member == userId)

        if (!userExists) {
            user.teams.push(teamId)
            user.save()

            team.members.push(userId)
            team.save()
        }

        res.redirect('/team/all')
    }
}
