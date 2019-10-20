// при извикване на класа се създава нова стая,
// която има свойствата: room, shelfGenre, shelf, shelfCapacity'
// room се ползва само за валидация
// в shelf се пазят книгите

// в BookCollection има:
//     {
//         room,
//         shelfGenre,
//         shelf: [book1, book2],
//         shelfCapacity
//     }

class BookCollection {
    constructor(shelfGenre, room, shelfCapacity) {
        this.room = room
        this.shelfGenre = shelfGenre
        this.shelfCapacity = shelfCapacity
        this.shelf = [] //  {name:lala, author: I. Vazov, genre: OPTIONAL}
    }

    get room() {
        return this._room
    }

    set room(room) {

        let allRooms = ['livingRoom', 'bedRoom', 'closet']

        if (allRooms.includes(room)) {
            this._room = room

        } else {
            throw Error(`Cannot have book shelf in ${room}`)
        }
    }

    addBook(bookName, bookAuthor, genre) {
        let book = { bookName, bookAuthor }

        if (genre) {
            book.genre = genre     // it is optional
        }

        if (this.shelf.length < this.shelfCapacity) {  //? or just =
            this.shelf.push(book)

        } else {
            this.shelf.shift()
            this.shelf.unshift(book)
        }

        this.shelf.sort((book1, book2) => book1.bookAuthor.localeCompare(book2.bookAuthor))
        return this //
    }

    throwAwayBook(bookName) {
        let bookIndex = this.shelf.findIndex(book => book.bookName === bookName)
        this.shelf.splice(bookIndex, 1)
    }

    showBooks(genre) {
        let output = `Results for search ${genre}:`

        this.shelf.forEach(book => {
            if (book.genre === genre) {
                output += `\n\uD83D\uDCD6 ${book.bookAuthor} – ${book.bookName}`
            }
        })
        return output
    }

    get shelfCondition() {
        return this.shelfCapacity - this.shelf.length
    }

    toString() {
        let output = ''

        if (this.shelf.length) {
            output += `${this.shelfGenre} shelf in ${this._room} contains:`

            this.shelf.forEach(book => {
                output += `\n\uD83D\uDCD6 ${book.bookAuthor} – ${book.bookName}`
            })

        } else {
            output = `It's an empty shelf`
        }

        return output
    }
}

let livingRoom = new BookCollection("Programming", "livingR", 5)
    .addBook("1. Introduction to Programming with C#", "Avetlin Nakov", 'C#')
    .addBook("2. Introduction to Programming with Java", "Qvetlin Nakov")
    .addBook("3. Programming for .NET Framework", "Svetlin Nakov")
    .addBook("4. Programming for .NET Framework", "Svetlin Nakov")
    .addBook("5. Programming for .NET Framework", "Avetlin Nakov")
    // .addBook("6. Programming for .NET Framework", "Svetlin Nakov")
console.log(livingRoom.toString())