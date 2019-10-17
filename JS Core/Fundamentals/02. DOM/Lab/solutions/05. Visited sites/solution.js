function solve() {
  //TO DO
  let exerciseElement = document.getElementById('exercise')
  let spanElements = exerciseElement.getElementsByTagName('span')
  let anchorElements = exerciseElement.getElementsByTagName('a')

  anchorElements[0].onclick = addCountSoftUni
  anchorElements[1].onclick = addCountGoogle
  anchorElements[2].onclick = addCountYoutube
  anchorElements[3].onclick = addCountWikipedia
  anchorElements[4].onclick = addCountGmail
  anchorElements[5].onclick = addCountStackOverFlow

  function addCountSoftUni() {
    let softUniVisited = spanElements[0].textContent
    let count = Number(softUniVisited.split(' ')[1]) + 1
    spanElements[0].textContent = `Visited: ${count} times`
  }

  function addCountGoogle() {
    let googleVisited = spanElements[1].textContent
    let count = Number(googleVisited.split(' ')[1]) + 1
    spanElements[1].textContent = `Visited: ${count} times`
  }

  function addCountYoutube() {
    let youtubeVisited = spanElements[2].textContent
    let count = Number(youtubeVisited.split(' ')[1]) + 1
    spanElements[2].textContent = `Visited: ${count} times`
  }

  function addCountWikipedia() {
    let wikipediaVisited = spanElements[3].textContent
    let count = Number(wikipediaVisited.split(' ')[1]) + 1
    spanElements[3].textContent = `Visited: ${count} times`
  }

  function addCountGmail() {
    let gmailVisited = spanElements[4].textContent
    let count = Number(gmailVisited.split(' ')[1]) + 1
    spanElements[4].textContent = `Visited: ${count} times`
  }

  function addCountStackOverFlow() {
    let stackOverFlowVisited = spanElements[5].textContent
    let count = Number(stackOverFlowVisited.split(' ')[1]) + 1
    spanElements[5].textContent = `Visited: ${count} times`
  }
}