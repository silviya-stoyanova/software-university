function solve() {
    return objectChild = {
        __proto__: {},
        extend: function (template) {
            Array.from(Object.entries(template)).forEach(property => {
                console.log('property here: ' + property[0], property[1]);

                if (typeof property[1] === 'function') {
                    Object.setPrototypeOf(objectChild, template)

                } else {
                    objectChild[property[0]] = property[1]
                }
            })
        }
    }
}

let myObj = solve()
myObj.extend({
    extensionMethod: function () {
        console.log("From extension method")
    },
    extensionProperty: 'someString'
})

console.log(myObj)
console.log('I am prototipe: ', Object.getPrototypeOf(myObj))