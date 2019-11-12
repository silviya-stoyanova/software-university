import React, { Component, Fragment } from 'react'
import LoginForm from './user/login'
import RegisterForm from './user/register'
import CreatePokemonForm from './pokemon/create'
import AllPokemons from './pokemon/getAll'
import logoutUser from './user/logout'

class Header extends Component {
    state = {
        nextComponent: null
    }

    isLogged = () => {
        if (localStorage.getItem('token')) {
            return true
        } else {
            return false
        }
    }

    getUsername = () => {
        return localStorage.getItem('user')
    }

    updateNextComponent = (element) => {
        if (element === 'Home') {
            this.setState({ nextComponent: <AllPokemons /> })
        } else if (element === 'Login') {
            this.setState({ nextComponent: <LoginForm /> })
        } else if (element === 'Register') {
            this.setState({ nextComponent: <RegisterForm /> })
        } else if (element === 'CreatePokemon') {
            this.setState({ nextComponent: <CreatePokemonForm /> })
        }
    }

    render() {
        return (
            <Fragment>
                <ul>
                    <li className="nav-link" onClick={() => this.updateNextComponent('Home')} >HOME</li>
                    {this.isLogged() === false
                        ? <Fragment>
                            <li className="nav-link" onClick={() => this.updateNextComponent('Login')}>LOGIN</li>
                            <li className="nav-link" onClick={() => this.updateNextComponent('Register')}>REGISTER</li>
                        </Fragment>

                        : <Fragment>
                            <li className="nav-link" >WELCOME {this.getUsername().toUpperCase()}</li>
                            <li className="nav-link" onClick={() => this.updateNextComponent('CreatePokemon')}>CREATE NEW POKEMON</li>
                            <li className="nav-link" onClick={logoutUser} >LOGOUT</li>
                        </Fragment>}
                </ul>

                <div>
                    {this.state.nextComponent}
                </div>
            </Fragment>
        )
    }
}

export default Header