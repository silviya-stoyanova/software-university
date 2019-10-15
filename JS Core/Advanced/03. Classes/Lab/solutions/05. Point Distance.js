class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static distance(firstPoint, secondPoint) {
        let x1 = firstPoint.x
        let y1 = firstPoint.y
        let x2 = secondPoint.x
        let y2 = secondPoint.y

        let sideA = Math.abs(x1 - x2)
        let sideB = Math.abs(y1 - y2)
        // c = sqrt (a2 + b2)
        let sideC = Math.sqrt(Math.pow(sideA, 2) + Math.pow(sideB, 2))
        return sideC
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));