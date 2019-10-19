// function solve() {   // for judge
$('#kingdom button').click(rebuildKingdom)
$('#characters button').click(joinCharacters)
$('#actions button').click(attack)

function rebuildKingdom() {
   let kingdomTypes = ['CASTLE', 'DUNGEON', 'FORTRESS', 'INFERNO', 'NECROPOLIS', 'RAMPART', 'STRONGHOLD', 'TOWER', 'CONFLUX']
   let kingdom = $('#kingdom input[placeholder="Kingdom..."]').val().toUpperCase()
   let king = $('#kingdom input[placeholder="King..."]').val().toUpperCase()

   if (kingdomTypes.includes(kingdom) && king.length >= 2) {
      let armyInfoEl = $('<fieldset>')
      armyInfoEl
         .append($('<legend>').text('ARMY'))
         .append($('<p>').text('TANKS - 0'))
         .append($('<p>').text('FIGHTERS - 0'))
         .append($('<p>').text('MAGES - 0'))
         .append($('<div>').addClass('armyOutput'))

      $(`#${kingdom.toLowerCase()}`)
         .append($('<h1>').text(kingdom))
         .append($('<div>').addClass('castle'))
         .append($('<h2>').text(king))
         .append(armyInfoEl)
         .css('display', 'inline-block')
   } else {
      $('#kingdom input[placeholder="Kingdom..."]').val('')
      $('#kingdom input[placeholder="King..."]').val('')
   }
}

function joinCharacters() {
   // let characterTypes = ['TANK', 'FIGHTER', 'MAGE']
   let selectedCharType = $('#characters input:checked')
   let charName = $('#characters input[placeholder="Character..."]').val()
   let kingdomName = $('#characters input[placeholder="Kingdom..."]').val().toUpperCase()

   if (selectedCharType.length > 0 && charName.length >= 2 && kingdomName.length >= 2) {
      // няколко kingdom от един и същи тип? - няма да има
      let kingdomEl = $(`#${kingdomName.toLowerCase()}`)
      let kingdomExists = $(`#${kingdomName.toLowerCase()}`).children().length > 0
      if (kingdomExists) {
         kingdomEl.find($('fieldset p'))
            .toArray()
            .map(par => {
               if ($(par).text().includes(selectedCharType.eq(0).val().toUpperCase())) {
                  let parText = $(par).text().split(' - ')
                  parText[1]++
                  $(par).text(parText.join(' - '))
               }
            })

         let armyNames = kingdomEl.find($('.armyOutput')).text() + ' ' + charName
         kingdomEl.find($('.armyOutput')).text(armyNames)
      }
   } else {
      $('#characters input:checked').prop('checked', false)   //! clear the radio button
      $('#characters input[placeholder="Character..."]').val('')
      $('#characters input[placeholder="Kingdom..."]').val('')
   }
}

function attack() {
let attackerKingdom = $('#actions inpuut')


}


// }