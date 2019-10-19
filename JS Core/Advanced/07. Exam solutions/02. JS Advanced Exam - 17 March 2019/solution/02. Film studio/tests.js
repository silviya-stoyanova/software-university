// constructor()
// if it is initialised with property name
// if it is initialised with property films - empty []

// casting(actor, role)
// if there are any movies
// -- pass existing role
// -- pass non existing role (isTheActorIsUnemployed === true)
// if there aren't movies

// makeMovie(filmName, roles)
// pass 2 arguments
// -- pass a string and array (valid ones)
// ----- pass a new film
// ----- pass existing film (part 2)
// ----- pass existing film (part 3)
// -------- for every test above: to check if the film is stored in this.films
// -------- for every test above: to check the returned value (film)
// -- pass a number and string (invalid ones)
// pass less/more than 2 arguments

// lookForProducer(film)
// -- pass existing movie with 1 actor
// -- pass existing movie that has 2 parts
// -- pass non existing movie

let mocha = require('mocha')
let assert = require('chai').assert
let FilmStudio = require('./filmStudio')

describe('tests for class FilmStudio', () => {
    let filmStudio
    beforeEach(() => {
        filmStudio = new FilmStudio('Silvi movies')
    })

    describe('test the constructor()', () => {
        it('should have property name', () => {
            assert.property(filmStudio, 'name')
        })

        it('should have property films', () => {
            assert.property(filmStudio, 'films')
        })

        it('films should be an empty []', () => {
            let result = JSON.stringify(filmStudio.films)
            assert.equal(result, '[]')
        })
    })

    describe('test casting()', () => {
        it('passes existing role when there are movies', () => {
            filmStudio.makeMovie('Grocery',
                ['cucumber', 'tomato', 'potato'])
            filmStudio.makeMovie('Food',
                ['bread', 'berries', 'banana'])
            let result = filmStudio.casting('Lele', 'potato')
            let expected = `You got the job! Mr. Lele you are next potato in the Grocery. Congratz!`
            assert.equal(result, expected)
        })

        it('passes NON existing role when there are movies', () => {
            filmStudio.makeMovie('Grocery',
                ['cucumber', 'tomato', 'potato'])
            let result = filmStudio.casting('Lenny', 'banana')
            let expected = `Lenny, we cannot find a banana role...`
            assert.equal(result, expected)
        })

        it('passes NON existing role when there are movies', () => {
            filmStudio.makeMovie('Grocery',
                ['cucumber', 'tomato', 'potato'])
            let result = filmStudio.casting('Lenny', 'banana')
            let expected = `Lenny, we cannot find a banana role...`
            assert.equal(result, expected)
        })

        it('passes a role when there are NO movies', () => {
            let result = filmStudio.casting('Winter', 'tree')
            let expected = `There are no films yet in Silvi movies.`
            assert.equal(result, expected)
        })
    })

    describe('test makeMovie()', () => {
        it('passes valid data and a new movie', () => {
            let result = JSON.stringify(
                filmStudio.makeMovie('Nails', ['blanket', 'hero', 'guest']))
            let expected = `{"filmName":"Nails","filmRoles":[{"role":"blanket","actor":false},{"role":"hero","actor":false},{"role":"guest","actor":false}]}`
            assert.equal(result, expected)

            let allFilms = JSON.stringify(filmStudio.films)
            let expectedAllFilms = `[{"filmName":"Nails","filmRoles":[{"role":"blanket","actor":false},{"role":"hero","actor":false},{"role":"guest","actor":false}]}]`
            assert.equal(allFilms, expectedAllFilms)  // check all films
        })

        it('passes valid data and an existing movie', () => {
            filmStudio.makeMovie('Nails', ['blanket', 'hero', 'guest'])
            let result = JSON.stringify(
                filmStudio.makeMovie('Nails', ['blanket4e', 'hero4e', 'guest4e']))
            let expected = `{"filmName":"Nails 2","filmRoles":[{"role":"blanket4e","actor":false},{"role":"hero4e","actor":false},{"role":"guest4e","actor":false}]}`
            assert.equal(result, expected)

            let allFilms = JSON.stringify(filmStudio.films)
            let expectedAllFilms = `[{"filmName":"Nails","filmRoles":[{"role":"blanket","actor":false},{"role":"hero","actor":false},{"role":"guest","actor":false}]},{"filmName":"Nails 2","filmRoles":[{"role":"blanket4e","actor":false},{"role":"hero4e","actor":false},{"role":"guest4e","actor":false}]}]`
            assert.equal(allFilms, expectedAllFilms)  // check all films
        })

        it('passes valid data and an existing movie twice', () => {
            filmStudio.makeMovie('Nails', ['blanket', 'hero', 'guest'])
            filmStudio.makeMovie('Nails', ['blanket4e', 'hero4e', 'guest4e'])
            filmStudio.makeMovie('Nails', ['anotherBlanket', 'anotherBero', 'anotherGuest'])
            let allFilms = JSON.stringify(filmStudio.films)
            let expectedAllFilms = `[{"filmName":"Nails","filmRoles":[{"role":"blanket","actor":false},{"role":"hero","actor":false},{"role":"guest","actor":false}]},{"filmName":"Nails 2","filmRoles":[{"role":"blanket4e","actor":false},{"role":"hero4e","actor":false},{"role":"guest4e","actor":false}]},{"filmName":"Nails 3","filmRoles":[{"role":"anotherBlanket","actor":false},{"role":"anotherBero","actor":false},{"role":"anotherGuest","actor":false}]}]`
            assert.equal(allFilms, expectedAllFilms)  // check all films
        })

        it('passes invalid data', () => {
            let result = () => { filmStudio.makeMovie(25, 'IAmNotArray') }
            assert.throw(result, 'Invalid arguments')
        })

        it('passes wrong count of arguments', () => {
            let result = () => { filmStudio.makeMovie(25) }
            assert.throw(result, 'Invalid arguments count')
        })
    })

    describe('test lookForProducer()', () => {
        it('passes an existing movie with only one actor', () => {
            filmStudio.makeMovie('Heroes', ['potato', 'bush'])
            filmStudio.casting('J. Bush', 'bush')
            let result = JSON.stringify(filmStudio.lookForProducer('Heroes'))
            let expected = '"Film name: Heroes\\nCast:\\nfalse as potato\\nJ. Bush as bush\\n"'
            assert.equal(result, expected)
        })

        it('passes an existing movie that has 2 parts', () => {
            filmStudio.makeMovie('Heroes', ['bush'])
            filmStudio.makeMovie('Heroes', ['potato'])
            filmStudio.casting('J. Bush', 'bush')
            filmStudio.casting('Patatini', 'potato')
            let result = JSON.stringify(filmStudio.lookForProducer('Heroes'))
            let expected = '"Film name: Heroes\\nCast:\\nJ. Bush as bush\\n"'
            assert.equal(result, expected)
        })

        it('passes an NON existing movie', () => {
            let result = () => {
                filmStudio.lookForProducer('Heroes')
            }
            assert.throw(result, `Heroes do not exist yet, but we need the money...`)
        })
    })
})