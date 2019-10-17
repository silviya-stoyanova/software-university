function solveLetterOccurrencesInString(word, letter) {
    let count = 0
    word = word.split('').map(char => char === letter ? count++ : count + 0)
    console.log(count);
}
solveLetterOccurrencesInString('panther', 'n')