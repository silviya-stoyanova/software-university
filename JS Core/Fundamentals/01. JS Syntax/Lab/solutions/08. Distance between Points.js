function solveDistanceBetweenPoints(x1, y1, x2, y2) {
    let pointCoordinates = {
        x1, y1, x2, y2
    }

    let z1 = Math.max(pointCoordinates['x1'], pointCoordinates['x2']) - Math.min(pointCoordinates.x1, pointCoordinates.x2)
    let z2 = Math.max(pointCoordinates['y1'], pointCoordinates.y2) - Math.min(pointCoordinates.y1, pointCoordinates.y2)
    let distance = Math.sqrt(Math.pow(z1, 2) + Math.pow(z2, 2))

    console.log(distance);
}
solveDistanceBetweenPoints(2.34, 15.66, -13.55, -2.9985)