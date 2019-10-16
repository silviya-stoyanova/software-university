$(() => {
    const app = Sammy('#main', function () {
        // TO DO: Define all the routes
        this.use('Handlebars', 'hbs')

        this.get('#/home', userHandlers.home)
        this.get('#/about', userHandlers.about)
        this.get('#/login', userHandlers.showLogin)
        this.get('#/register', userHandlers.showReg)
        this.get('#/logout', userHandlers.logout)

        this.post('#/login', userHandlers.postLogin)
        this.post('#/register', userHandlers.postReg)

        this.get('#/catalog', actionsHandlers.getCatalog)
        this.get('#/catalog/:currTeamId', actionsHandlers.showTeam)
        this.get('#/create', actionsHandlers.getCreateTeam)
        this.get('#/edit/:teamId', actionsHandlers.getEditTeam)
        this.get('#/join/:teamId', actionsHandlers.joinTeam)
        this.get('#/leave', actionsHandlers.leaveTeam)
        this.get('#/delete/:teamId', actionsHandlers.deleteTeam)

        this.post('#/create', actionsHandlers.postCreateTeam)
        this.post('#/edit/:teamId', actionsHandlers.postEditTeam)
    });

    app.run('/#/home');
})