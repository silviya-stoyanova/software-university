import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import observer from '../../observer'
import '../../style/menu.css'

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: sessionStorage.getItem('authtoken')
        }

        // this.loginUserNav = this.loginUserNav.bind(this)
        // this.logoutUserNav = this.logoutUserNav.bind(this)
        observer.subscribe('loginUser', this.loginUserNav)
        observer.subscribe('logoutUser', this.logoutUserNav)
    }

    loginUserNav = (data) => {
        this.setState(prevState => ({
            isLogged: true,
            username: data.username
        }))
    }

    logoutUserNav = () => {
        this.setState(prevState => ({
            isLogged: false,
            username: null
        }))
    }

    render() {
        return (
            this.state.isLogged
                ? <div id="menu">
                    <div className="title">Navigation</div>
                    <ul>
                        <Link to="/posts/all" className="nav">Catalog</Link>
                        <Link to="/posts/add" className="nav">Submit post</Link>
                        <Link to="/posts/mine" className="nav">My posts</Link>
                    </ul>
                </div >
                : null
        )
    }

    // componentDidMount() {
    //     this.setState(prevState => ({
    //         isLogged: sessionStorage.getItem('authtoken')
    //     }))
    // }
}

export default Navigation