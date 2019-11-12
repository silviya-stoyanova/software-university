import React, { Component, Fragment } from 'react'

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: null,
            email: null,
            password: null,
            repeatPassword: null
        }
    }

    handleInputChange = (event) => {
        event.persist()

        this.setState((prevState) => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    handleFormSubmit = (event) => {
        // debugger
        event.preventDefault()
        const userRegisterUrl = 'http://localhost:5000/auth/signup'
        const userLoginUrl = 'http://localhost:5000/auth/login'
        console.log(this.state);
        const { name, email, password } = this.state

        fetch(userRegisterUrl, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' }

        }).then(res => res.json()
        ).then(res => {
            console.log('registration')
            console.log(res)

            // if something went wrong during registration
            if (!res.success) {

                return
            }

            // sent success message

            fetch(userLoginUrl, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' }

            }).then(res => res.json()
            ).then(res => {
                console.log('login')
                console.log(res);

                if (!res.success) {

                    return
                }

                // sent success message

                localStorage.setItem('user', res.user.name)
                localStorage.setItem('token', res.token)
            })
        })
    }

    render() {
        return (
            <Fragment>
                <h2>Register</h2>

                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input onChange={this.handleInputChange} name="name" type="text" required />
                    <br />
                    <label htmlFor="email">Email: </label>
                    <input onChange={this.handleInputChange} name="email" type="text" required />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input onChange={this.handleInputChange} name="password" type="password" required />
                    <br />
                    <label htmlFor="repeatPassword">Repeat password: </label>
                    <input onChange={this.handleInputChange} name="repeatPassword" type="password" required />
                    <br />
                    <button type="submit">SUBMIT</button>
                </form>
            </Fragment>
        )
    }
}

export default RegisterForm
