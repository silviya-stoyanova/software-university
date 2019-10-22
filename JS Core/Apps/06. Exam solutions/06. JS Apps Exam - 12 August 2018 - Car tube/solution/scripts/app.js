$(() => {   // on document load..

    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs')

        this.get('#/home', carHandler.getHome)
        this.get('#/user/login', userHandler.getLogin)
        this.get('#/user/register', userHandler.getRegister)
        this.get('#/user/logout', userHandler.logoutUser)

        this.post('#/user/login', userHandler.loginUser)
        this.post('#/user/register', userHandler.registerUser)



        this.get('#/cars/all', carHandler.getHome)
        this.get('#/cars/mine', carHandler.showMyCars)
        this.get('#/cars/create', carHandler.getCreateCar)

        this.get('#/cars/details/:carId', carHandler.showCarDetails)
        this.get('#/cars/edit/:carId', carHandler.getEditCar)
        this.get('#/cars/delete/:carId', carHandler.delCar)

        this.post('#/cars/create', carHandler.createCar)
        this.post('#/cars/edit/:carId', carHandler.editCar)

        // todo: show notifications
    })

    app.run('#/home')
})