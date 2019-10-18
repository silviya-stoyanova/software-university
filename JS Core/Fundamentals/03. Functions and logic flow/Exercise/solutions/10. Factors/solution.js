function solve() {
   let number = Number(document.getElementById('num').value)
   calculateFactors()

   function calculateFactors() {
      let factors = []

      for (let i = 1; i <= number; i++) {    // а отрицателните числа?
         let result = number / i

         if (result === Math.round(result)) { // if num is integer
            factors.push(i)
         }
      }

      factors.sort((a, b) => a - b)
      document.getElementById('result').textContent = factors.join(' ')
   }
}