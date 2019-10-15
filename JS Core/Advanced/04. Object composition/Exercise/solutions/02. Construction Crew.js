function solve(worker) {    // IIFE?
    if (worker.dizziness) {
        let neededAlcLev = worker.weight * worker.experience * 0.1
        worker.levelOfHydrated += neededAlcLev
        worker.dizziness = false
    }

    return worker
}
console.log(solve({
    weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true
}))