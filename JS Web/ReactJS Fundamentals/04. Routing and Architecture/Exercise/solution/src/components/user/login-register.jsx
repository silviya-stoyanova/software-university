import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { toast } from 'react-toastify'
import userService from '../../kinvey/user/user-service'
import observer from '../../observer'

class LoginRegister extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: null,
            password: null,
            repeatPass: null,
            isLogged: false
        }
    }

    updateState = () => {
        if (sessionStorage.getItem('authtoken')) {
            this.setState((prevState) => ({
                isLogged: true,
                username: sessionStorage.getItem('username')
            }))

            // there is function in header.js, which is stored in observer.js
            // to be able to call it from another file (like this one),

            // here call the function to update the state in the header
            observer.trigger('loginUser', { username: this.state.username })
        }
    }

    sumbitLoginForm = (event) => {
        event.preventDefault()

        if (!this.state.username || !this.state.password) {
            return toast.error('Username or password is invalid!')
        }

        userService.login(this.state.username, this.state.password)
            .then(res => res.json())
            .then(async res => {
                if (res.error) {
                    return toast.error(res.description)
                }

                await userService.saveSession(res)
                this.updateState()
                toast.success('Successful login!', {
                    closeButton: false
                })
            })
            .catch(err => {
                if (err.error) {
                    return toast.error(err.message)
                }
            })
    }

    sumbitRegisterForm = (event) => {
        event.preventDefault()
        const { username, password, repeatPass } = this.state

        if (!username || username.length < 5 || username.length > 15) {
            return toast.error('Username must be between 5 and 15 symbols!')
        } else if (!password || password.length < 5) {
            return toast.error('Password must consist of at least 5 symbols!')
        } else if (password !== repeatPass) {
            return toast.error('Both passwords do not match!')
        }

        userService.register(username, password)
            .then(res => res.json())
            .then(async res => {
                if (res.error) {
                    return toast.error(res.description)
                }

                await userService.saveSession(res)
                this.updateState()
                toast.success('Successful login!', {
                    closeButton: false
                })
            })
            .catch(err => {
                if (err.error) {
                    return toast.error(err.message)
                }
            })
    }

    onInputChange = (event) => {
        const { target } = event
        const { name } = target

        this.setState(prevState => ({
            [name]: target.value
        }))
    }

    logInForm = () => (
        <form id="loginForm" onSubmit={this.sumbitLoginForm}>
            <h2>Sign In</h2>
            <label>Username:</label>
            <input name="username" type="text" onChange={this.onInputChange} />
            <label>Password:</label>
            <input name="password" type="password" onChange={this.onInputChange} />
            <input id="btnLogin" value="Sign In" type="submit" />
        </form>
    )

    registerForm = () => (
        <form id="registerForm" onSubmit={this.sumbitRegisterForm}>
            <h2>Register</h2>
            <label>Username:</label>
            <input name="username" type="text" onChange={this.onInputChange} />
            <label>Password:</label>
            <input name="password" type="password" onChange={this.onInputChange} />
            <label>Repeat Password:</label>
            <input name="repeatPass" type="password" onChange={this.onInputChange} />
            <input id="btnRegister" value="Sign Up" type="submit" />
        </form>
    )

    render() {
        return (
            <Fragment>
                {
                    this.state.isLogged
                        ? <Redirect to='/' />
                        : null
                }
                <section id="viewWelcome">
                    <div className="welcome">

                        <div className="signup">
                            {this.logInForm()}
                            {this.registerForm()}
                        </div>

                        <div className="about">
                            <h1>Welcome to SeenIt</h1>
                            <p>Share interesting links and discuss great content.
                                It's what's happening now.</p>
                            <p>Sign in or sign up in a second.</p>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default LoginRegister
