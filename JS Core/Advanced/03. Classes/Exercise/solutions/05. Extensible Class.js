(function solve() {
    let id = 0

    class Extensible {
        constructor() {
            this.id = id++
        }

        extend(template) {

            Object.entries(template).forEach(kvp => {

                if (typeof kvp[1] === 'string' || typeof kvp[1] === 'number') {
                    this[kvp[0]] = kvp[1]

                } else if (typeof kvp[1] === 'function') {    //
                    Extensible.prototype[kvp[0]] = kvp[1]
                }
            })
        }
    }

    return Extensible

    // let obj1 = new Extensible();
    // var template = {
    //     extensionData: 5,
    //     extensionMethod: function (value) {
    //         return value + 1;
    //     }
    // }
    //
    // obj1.extend(template)
    // console.log(obj1.hasOwnProperty('extensionData'));
})()