const actionsHandlers = (() => {
    function getCatalog() {
        this.loggedIn = sessionStorage.getItem('authtoken')
        this.username = sessionStorage.getItem('username')
        let mainContext = this

        // show and hide Create Team link
        let teamId = sessionStorage.getItem('teamId')
        teamId
            ? this.hasNoTeam = false
            : this.hasNoTeam = true

        teamsService.loadTeams()
            .then(function (context) {
                mainContext.teams = context

                mainContext.loadPartials({
                    header: '../templates/common/header.hbs',
                    team: '../templates/catalog/team.hbs',
                    footer: '../templates/common/footer.hbs'

                }).then(function () {
                    this.partial('../templates/catalog/teamCatalog.hbs')
                })
            })
    }

    function getCreateTeam() {
        this.loggedIn = sessionStorage.getItem('authtoken')
        this.username = sessionStorage.getItem('username')

        this.loadPartials({
            header: '../templates/common/header.hbs',
            createForm: '../templates/create/createForm.hbs',
            footer: '../templates/common/footer.hbs'

        }).then(function () {
            this.partial('../templates/create/createPage.hbs')
        })
    }

    function postCreateTeam(context) {
        let name = context.params.name
        let comment = context.params.comment
        let mainContext = this

        if (name && comment) {
            teamsService.createTeam(name, comment)
                .then(function (context) {

                    let teamAuthor = context._acl.creator
                    sessionStorage.setItem('userId', teamAuthor)

                    let tId = context._id
                    sessionStorage.setItem('teamId', tId)

                    mainContext.isAuthor = true
                    mainContext.isOnTeam = true

                    mainContext.redirect(`#/catalog/:${tId}`)
                })
        }
    }

    function showTeam(context) {
        this.loggedIn = sessionStorage.getItem('authtoken')
        this.username = sessionStorage.getItem('username')

        let mainContext = this
        let currTeamId = context.params.currTeamId.substr(1)

        teamsService.loadTeamDetails(currTeamId)
            .then(function (context) {

                let teamAuthor = context._acl.creator
                let tId = context._id

                let userId = sessionStorage.getItem('userId')
                let teamId = sessionStorage.getItem('teamId')

                if (teamAuthor === userId) {
                    mainContext.isAuthor = true
                }
                if (tId === teamId) {
                    mainContext.isOnTeam = true
                }

                mainContext.teamId = tId
                mainContext.name = context.name
                mainContext.members = [{ username: 'Silvi' }, { username: 'is the best ♥' }] //todo
                mainContext.comment = context.comment

                mainContext.loadPartials({
                    header: '../templates/common/header.hbs',
                    teamMember: '../templates/catalog/teamMember.hbs',
                    teamControls: '../templates/catalog/teamControls.hbs',
                    footer: '../templates/common/footer.hbs'

                }).then(function () {
                    this.partial('../templates/catalog/details.hbs')
                })
            })
    }

    function joinTeam(context) {
        let currTeamId = context.params.teamId.substr(1)
        let userTeamId = sessionStorage.getItem('teamId')

        if (userTeamId === '') {
            teamsService.joinTeam(currTeamId)
                .then(function (ctx) {
                    sessionStorage.setItem('teamId', ctx.teamId)
                    this.isOnTeam = true // or this.isOnTeam
                    auth.showInfo(`Successfully joined this team!`)
                })

        } else {
            auth.showError('You can only be a member of one team!')
        }
        this.redirect(`#/catalog`)
    }

    function leaveTeam() {
        sessionStorage.setItem('teamId', '')
        this.isOnTeam = false
        this.redirect('#/catalog')

        teamsService.leaveTeam()
            .then(function () {
                sessionStorage.setItem('teamId', '')
                auth.showInfo(`Successfully left this team!`)
            })
    }

    function getEditTeam(context) {
        this.loggedIn = sessionStorage.getItem('authtoken')
        this.username = sessionStorage.getItem('username')
        this.teamId = context.params.teamId.substr(1)

        this.loadPartials({
            header: '../templates/common/header.hbs',
            editForm: '../templates/edit/editForm.hbs',
            footer: '../templates/common/footer.hbs'

        }).then(function () {
            this.partial('../templates/edit/editPage.hbs')
        })
    }

    function postEditTeam(context) {
        let newName = context.params.name
        let newComm = context.params.comment
        let teamId = context.params.teamId.substr(1)
        let mainContext = this

        teamsService.edit(teamId, newName, newComm)
            .then(function () {
                mainContext.redirect(`#/catalog/:${teamId}`)
            })
    }

    function deleteTeam(context) {
        let teamId = context.params.teamId.substr(1)

        teamsService.del(teamId)
            .then(function () {
                sessionStorage.setItem('teamId', '')
            })
        this.redirect('#/catalog')
    }

    return {
        getCatalog,
        getCreateTeam,
        postCreateTeam,
        showTeam,
        joinTeam,
        leaveTeam,
        getEditTeam,
        postEditTeam,
        deleteTeam
    }
})()