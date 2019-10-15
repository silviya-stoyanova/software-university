function timer() {
   $('#start-timer').on('click', startTimer)
   $('#stop-timer').click(stopTimer)
   let myTime

   function startTimer() {
      let hours = $('#hours')
      let minutes = $('#minutes')
      let seconds = $('#seconds')
      myTime = setInterval(measureTime, 1000)

      function measureTime() {
         if (+seconds.text() < 59) {
            if (+seconds.text() < 9) {
               seconds.text('0' + (+seconds.text() + 1))
            } else {
               seconds.text(+seconds.text() + 1)
            }

         } else {
            if (+minutes.text() < 59) {
               if (+minutes.text() < 9) {
                  minutes.text('0' + (+minutes.text() + 1))
               } else {
                  minutes.text(+minutes.text() + 1)
               }
               seconds.text('00')

            } else {
               if (+hours.text() < 9) {
                  hours.text('0' + (+hours.text() + 1))
               } else {
                  hours.text(+hours.text() + 1)
               }

               seconds.text('00')
               minutes.text('00')
            }
         }
      }

      // to be unable to push the start button
      $('#start-timer').off('click', startTimer)   // to not do this for the test
   }

   function stopTimer() {
      clearInterval(myTime)
      console.log('stop', myTime)
      // to able again to push the start button
      $('#start-timer').on('click', startTimer)
   }
}