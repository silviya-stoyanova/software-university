function solve(args) {
    let collection = []

    let operate = (function () {
        return {
            add: (string) => collection.push(string),
            remove: (string) => collection = collection.filter(x => !(x.includes(string))),
            print: () => console.log(collection.join(','))
        }
    })()

    for (let arg of args) {
        let [command, string] = arg.split(' ')
        operate[command](string)
    }
}
solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])