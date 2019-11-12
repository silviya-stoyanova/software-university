const pokemons = []

module.exports = {
    addPokem: (data) => {
        pokemons.push(data)
    },
    retrivePokemons: () => {
        console.log(pokemons)
        console.log('hello from database')
        return pokemons
    }
}