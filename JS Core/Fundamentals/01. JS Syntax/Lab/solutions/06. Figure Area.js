function solveFigureArea(x1, y1, x2, y2) {
    let s1 = x1 * y1
    let s2 = x2 * y2
    let commonArea = Math.min(x1, x2) * Math.min(y1, y2)
    let result = (s1 + s2) - commonArea
    console.log(result)
}
solveFigureArea(13, 2, 5, 8)