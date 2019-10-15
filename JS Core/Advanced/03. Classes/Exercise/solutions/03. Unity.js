class Rat {
    constructor(name) {
        this.name = name
        this.unitedRats = []
    }

    unite(newRat) {
        // if (this instanceof Rat) {THIS IS WRONG}
        // тук this сочи към плъха, на който е била извикана тази функция
        // а не към новия плъх, който се подава
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




// let test = new Rat("Pesho");
// console.log(test.toString()); //Pesho
// 
// console.log(test.getRats()); //[]
// 
// test.unite(new Rat("Gosho"));
// test.unite(new Rat("Sasho"));
// console.log(test.getRats());
// //[ Rat { name: 'Gosho', unitedRats: [] },
// //  Rat { name: 'Sasho', unitedRats: [] } ]
// 
// console.log(test.toString());
// // Pesho
// // ##Gosho
// // ##Sasho