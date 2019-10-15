function solve(args) {
    let allCars = {}
    let closureFunc = (function () {
        return {
            create: (name) => {
                allCars[name] = {}
            },
            inherit(childName, parentName) {
                let newlyCreatedObj = Object.create(allCars[parentName])
                allCars[childName] = newlyCreatedObj
            },
            set: function ([name, key, value]) {
                allCars[name][key] = value
            },
            print(name) {
                let output = []
                for (const key in allCars[name[0]]) {
                    // if (car.hasOwnProperty(key)) { 
                    // ТАКА СЕ ВЗИМАТ САМО НЕГОВИТЕ СВОЙСТВА
                    // НО НЕ И УНАСЛЕДЕНИТЕ
                    output.push(`${key}:${allCars[name][key]}`)
                }
                return console.log(output.join(', '));
            }
        }
    })()

    for (let line of args) {
        let [command, ...text] = line.split(' ')

        if (text[1] !== 'inherit') {
            closureFunc[command](text)

        } else {    // inherits case
            closureFunc[text[1]](text[0], text[2])
        }
    }
}
solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
)