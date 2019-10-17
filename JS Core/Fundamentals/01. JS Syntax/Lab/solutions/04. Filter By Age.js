function filterByAge(minAge, firstName, firstAge, secondName, secondAge) {
    let ouput = { name: [], age: [] }

    if (firstAge >= minAge) {
        ouput.name.push(firstName)
        ouput.age.push(firstAge)
    }

    if (secondAge >= minAge) {
        ouput.name.push(secondName)
        ouput.age.push(secondAge)
    }

    ouput.name = ouput.name.join(', ')
    ouput.age = ouput.age.join(', ')
    console.log(ouput);
}
filterByAge(12, 'Ivan', 15, 'Asen', 9)