import React, { Component, Fragment } from 'react'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null
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
        event.preventDefault()

        const { email, password } = this.state

        const userLoginUrl = 'http://localhost:5000/auth/login'

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
    }

    render() {
        return (
            <Fragment>
                <h2>Login</h2>

                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input onChange={this.handleInputChange} name="email" type="text" />
                    <br />
                    <label htmlFor="password">Password: </label>
                    <input onChange={this.handleInputChange} name="password" type="password" />
                    <br />
                    <button type="submit">SUBMIT</button>
                </form>
            </Fragment>
        )
    }
}

export default LoginForm
