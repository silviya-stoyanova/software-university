import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import observer from '../../observer'
import '../../style/header.css'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: false,
            username: this.props.username
        }

        // write a function in header.js
        // bind it here

        // to be able to call it from another file (like login-register.js),
        // push it in observer.js
        // this.loginUserHeader = this.loginUserHeader.bind(this)
        // this.logoutUserHeader = this.logoutUserHeader.bind(this)
        observer.subscribe('loginUser', this.loginUserHeader)
        observer.subscribe('logoutUser', this.logoutUserHeader)
    }

    loginUserHeader = (data) => {
        this.setState(prevState => ({
            isLogged: true,
            username: data.username
        }))
    }

    logoutUserHeader = () => {
        this.setState(prevState => ({
            isLogged: false,
            username: null
        }))
    }

    render() {
        const { username } = this.state

        return (
            <header>
                <Link to="/">
                    <span className="logo">☃</span>
                    <span className="header">SeenIt</span>
                </Link>

                <div id="profile">
                    {
                        username
                            ? <Fragment>
                                <span>Welcome, {username}</span> |
                                 <Link to="/user/logout">logout</Link>
                            </Fragment>
                            : <Link to="/user/login-register"> sign in/up </Link>
                    }
                </div>
            </header>
        )
    }
}

export default Header