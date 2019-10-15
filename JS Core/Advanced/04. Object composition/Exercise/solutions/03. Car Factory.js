function solve(desiredCar) {
    let car = { model: desiredCar.model }

    let engineSmall = { power: 90, volume: 1800 }
    let engineNormal = { power: 120, volume: 2400 }
    let engineMonster = { power: 200, volume: 3500 }

    let carriageHatchback = { type: 'hatchback', color: 'none' }
    let carriageCoupe = { type: 'coupe', color: 'none' }

    if (desiredCar.power <= 90) {
        car.engine = engineSmall
    } else if (desiredCar.power <= 120) {
        car.engine = engineNormal
    } else if (desiredCar.power <= 200) {
        car.engine = engineMonster
    }

    if (desiredCar.carriage === 'hatchback') {
        car.carriage = carriageHatchback
        car.carriage.color = desiredCar.color

    } else if (desiredCar.carriage === 'coupe') {
        car.carriage = carriageCoupe
        car.carriage.color = desiredCar.color
    }

    let wheels = Math.trunc(desiredCar.wheelsize)
    wheels % 2 === 0 ? wheels -= 1 : wheels -= 0
    car.wheels = [wheels, wheels, wheels, wheels]

    return car
}
solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
})