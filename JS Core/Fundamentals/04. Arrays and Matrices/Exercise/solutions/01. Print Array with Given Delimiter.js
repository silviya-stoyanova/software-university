function solve(array) {
    let delimeter = array.pop()
    console.log(array.join(delimeter));
}
solve(['One',
    'Two',
    'Three',
    'Four',
    'Five',
    '-'])