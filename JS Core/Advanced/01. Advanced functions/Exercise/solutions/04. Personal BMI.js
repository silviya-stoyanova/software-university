function solve(name, age, weight, height) {
    let bmi = -1
    let calculateBMI = (weight, height) => bmi = Math.round(weight / Math.pow(height / 100, 2))

    checkStatus = function () {
        if (bmi < 18.5) {
            return 'underweight'
        } else if (bmi < 25) {
            return 'normal'
        } else if (bmi < 30) {
            return 'overweight'
        } else if (bmi >= 30) {
            return 'obese'
        }
    }

    let personalObj = {
        name,
        personalInfo: {
            age,
            weight,
            height
        },
        BMI: calculateBMI(weight, height),
        status: checkStatus()
    }

    if (personalObj.status === 'obese') {
        personalObj.recommendation = 'admission required'
    }

    console.log(personalObj);
}
solve('Peter', 29, 75, 182)