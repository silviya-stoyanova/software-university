// function solve() { // softuni judge
$('button').on('click', onSignButtonClick)

function onSignButtonClick() {
   let selectedCourses = $('#availableCourses div.courseBody ul li input:checked')
      .parent()
      .find('label')
      .toArray()
      .map(label => label.textContent)

   selectedCourses = selectedCourses
      .map(course => {
         let myCoursesEl = $('<li>')
         myCoursesEl.text(`${course.split(' ')[0]}-${course.split(' ')[1]}`)
         $('#myCourses div.courseBody ul').append(myCoursesEl)
         return course
      })
      .join(' ')

   let [fundPrice, advPrice, appPrice, webPrice] = [170, 180, 190, 490]
   let totalPrice = 0

   if (selectedCourses.includes('Fundamentals')) {
      totalPrice = fundPrice
   }
   if (selectedCourses.includes('Advanced')) {
      totalPrice += advPrice
   }
   if (selectedCourses.includes('Applications')) {
      totalPrice += appPrice
   }
   if (selectedCourses.includes('Web')) {
      totalPrice += webPrice
   }

   // ако е избран Х
   // ако пък е избран У
   // ако пък е избран Z

   // ако и четирите курса са избрани /*бонус*/
   // ако пък само трите курса са избрани
   // ако пък само двата курса са избрани
   if (selectedCourses.includes('Fundamentals') && selectedCourses.includes('Advanced') &&
      selectedCourses.includes('Applications') && selectedCourses.includes('Web')) {
      // bonus
   }

   if (selectedCourses.includes('Fundamentals') && selectedCourses.includes('Advanced') &&
      selectedCourses.includes('Applications')) {
      totalPrice = (fundPrice + advPrice * 0.9 + appPrice) * 0.94

   } else if (selectedCourses.includes('Fundamentals') && selectedCourses.includes('Advanced')) {
      totalPrice = fundPrice + advPrice * 0.9
   }

   // ако са онлайн
   let educationForm = $('#educationForm input:checked').val()
   if (educationForm === 'online') {
      totalPrice *= 0.94
   }

   $('#myCourses div.courseFoot p').text(`Cost: ${Math.floor(totalPrice).toFixed(2)} BGN`)
}
// }
