function createCalculator() {
    let value = 0;
    return {
        add: function (num) { value += Number(num); },      // does not return anything
        subtract: function (num) { value -= Number(num); }, // same here
        get: function () { return value; }
    }
}

module.exports = createCalculator