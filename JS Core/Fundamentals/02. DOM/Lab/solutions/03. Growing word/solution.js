function solve() {
   //TO DO
   let exerciseElement = document.getElementById('exercise').addEventListener('click', changeText)
}

function changeText() {
   let textElement = document.getElementsByTagName('p')[2]

   let clickCount = textElement.style.fontSize //...take the current fontSize
   clickCount = Number(clickCount.substr(0, clickCount.length - 2))

   let color = ''
   let fontSize = clickCount + 2

   if (clickCount === 0) {
      fontSize = 2
   }

   if (clickCount % 3 === 1) {
      color = 'red'

   } else if (clickCount % 3 === 2) {
      color = 'green'

   } else if (clickCount % 3 === 0) {
      color = 'blue'
   }

   let paragraphStyle = `color: ${color}; font-size: ${fontSize}px`
   textElement.setAttribute('style', paragraphStyle)
}