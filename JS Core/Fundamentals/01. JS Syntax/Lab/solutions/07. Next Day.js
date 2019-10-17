function solveNextDay(year, month, day) {
    let today = new Date(year, month - 1, day)
    let oneDay = 24 * 60 * 60 * 1000 // in miliseconds
    let nextDate = new Date(today.getTime() + oneDay)

    let output = `${nextDate.getFullYear()}-${nextDate.getMonth() + 1}-${nextDate.getDate()}`

    console.log(output);
}
solveNextDay(2016, 1, 30)