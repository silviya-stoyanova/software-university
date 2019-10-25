function solve(array) {
    console.log(array.sort((a, b) => a.length - b.length || a[0].toLowerCase().localeCompare(b[0].toLowerCase())).join('\n'));
}
solve(['test',
    'Deny',
    'omen',
    'Default'])