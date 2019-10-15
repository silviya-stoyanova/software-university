function solve(rectangleArgs) {
    class Rectangle {
        constructor(width, height) {
            this.width = width
            this.height = height
        }

        area() {
            return this.width * this.height
        }

        compareTo(other) {
            return other.area() - this.area() || other.width - this.width
        }
    }

    let rectangles = []
    rectangleArgs.forEach(rectangleArg => rectangles.push(new Rectangle(rectangleArg[0], rectangleArg[1])))
    return rectangles.sort((a, b) => a.compareTo(b))
}
solve([[1, 20], [20, 1], [5, 3], [5, 3]])   