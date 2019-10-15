class Rat {
    constructor(name) {
        this.name = name
        this.unitedRats = []
    }

    unite(newRat) {
        if (newRat instanceof Rat) {
            this.unitedRats.push(newRat)
        }
    }

    getRats() {
        return this.unitedRats
    }

    toString() {
        let output = [this.name]
        for (let rat of this.unitedRats) {
            output.push(`##` + rat.name)
        }
        return output.join('\n')
    }
}

let rat2 = new Rat("Viktor");
let rat3 = new Rat("Vichi");
let rat4 = "fake rat";

rat2.unite(rat4);
console.log(rat2.getRats());
