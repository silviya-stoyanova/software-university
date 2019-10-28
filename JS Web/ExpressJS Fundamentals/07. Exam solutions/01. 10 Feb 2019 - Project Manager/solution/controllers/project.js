const Project = require('../models/Project')
const Team = require('../models/Team')

module.exports = {
    allGet: async (req, res) => {
        let searchFilter = req.query.search
        let teams = await Team.find()
        let projects = await Project.find().populate('team')

        let adminProjects = projects.filter(p => !p.team)
        let userProjects = projects

        if (searchFilter) {
            projects = projects.filter(p => p.name.toLowerCase().includes(searchFilter.toLowerCase()))
        }

        res.render('project/all', { adminProjects, userProjects, teams })
    },

    createGet: (req, res) => {
        res.render('project/create')
    },

    createPost: async (req, res) => {
        let project = req.body

        if (!project.name || !project.name.trim()) {
            console.log('Project name and description with max length of 50 chars are required!')
            return res.render('project/create', project)
        }

        if (!project.description || !project.description.trim() ||
            project.description.length > 50) {
            console.log('Project name and description with max length of 50 chars are required!')
            return res.render('project/create', project)
        }

        let nameIsTaken = Project.findOne({ name: project.name })
        if (nameIsTaken) {
            console.log('This project name is already taken!')
            return res.render('project/create', project)
        }

        Project.create(project)
        res.redirect('/')
    },

    distribute: async (req, res) => {
        const teamId = req.body.teamId
        const projectId = req.body.projectId

        if (projectId) {
            let team = await Team.findById(teamId)
            team.projects.push(projectId)
            await team.save()

            let project = await Project.findById(projectId)
            if (!project.team) {
                project.team = [teamId]
                project.save()
            } else {
                project.team.push(teamId)
                project.save()
            }
        }

        res.redirect('/project/all')
    }
}