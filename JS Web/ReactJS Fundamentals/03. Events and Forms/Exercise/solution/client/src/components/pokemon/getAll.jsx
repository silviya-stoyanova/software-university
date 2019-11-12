import React, { Component } from 'react'

class AllPokemons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemons: []
        }
    }

    render() {
        return (
            <div>
                {this.state.pokemons.map((p, index) => {
                    return (<div key={index}>
                        <div className="pokemon">{p.name.toUpperCase()} </div>
                        <img src={p.image} alt="pokemon-img" />
                        <div className="pokemon">{p.info}</div>
                    </div>)
                })}
            </div >
        )
    }

    componentDidMount() {
        const allPokemonsUrl = 'http://localhost:5000/pokedex/pokedex'
        // show loading message here


        fetch(allPokemonsUrl)
            .then(res => res.json())
            .then(res => {
                this.setState((prevState) => ({
                    pokemons: res.pokemonColection
                }))
            })
    }
}

export default AllPokemons
