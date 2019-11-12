const express = require('express')
const router = new express.Router()
const pokemons = require('./../data/pokemons')

router.post('/create', (req, res, next) => {
    pokemons.addPokem((req.body))
    res.status(200)
    res.json({ message: 'Successfully created a pokemon! ♥' })
    return res
})

router.get('/pokedex', (req, res, next) => {
    console.log('getting')
    console.log(pokemons.retrivePokemons())
    let pokemonColection = (pokemons.retrivePokemons())

    return res.status(200).json({
        pokemonColection
    })
})

module.exports = router