import React, { Component, Fragment } from 'react'

class CreatePokemonForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            image: null,
            info: null
        }
    }

    handleInputChange = (event) => {
        event.persist()
        console.log(event.target.name)
        console.log(event.target.value)

        this.setState((prevState) => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault()
        const { name, image, info } = this.state
        const createPokemonUrl = 'http://localhost:5000/pokedex/create'

        fetch(createPokemonUrl, {
            method: 'POST',
            body: JSON.stringify({ name, image, info }),
            headers: { 'Content-Type': 'application/json' }

        }).then(res => res.json()
        ).then(res => {
            console.log(res.message)
        })
    }

    render() {
        return (
            <Fragment>
                <h2>New pokemon</h2>

                <form onSubmit={this.handleFormSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input onChange={this.handleInputChange} name="name" type="text" />
                    <br />
                    <label htmlFor="image">Image: </label>
                    <input onChange={this.handleInputChange} name="image" type="text" />
                    <br />
                    <label htmlFor="info">Info: </label>
                    <input onChange={this.handleInputChange} name="info" type="text" />
                    <br />
                    <button type="submit">CREATE</button>
                </form>
            </Fragment>
        )
    }
}

export default CreatePokemonForm
