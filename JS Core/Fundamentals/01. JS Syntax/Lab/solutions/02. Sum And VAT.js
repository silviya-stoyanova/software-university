function solveSumAndVAT(input) {
    let sum = 0
    let vat = 0
    input.forEach(x => sum += Number(x))
    vat = sum * 0.2

    console.log('sum =', sum);
    console.log('VAT =', vat);
    console.log('total =', sum + vat);
}
solveSumAndVAT([1.20, 2.60, 3.50])
solveSumAndVAT([3.12, 5, 18, 19.24, 1953.2262, 0.001564, 1.1445])