function register() {
  let usernameElement = document.getElementById('username')
  let emailElement = document.getElementById('email')
  let passwordElement = document.getElementById('password')

  let username = usernameElement.value
  let email = emailElement.value
  let password = passwordElement.value

  if (username.length > 0 && email.match(/(.+)@(.+).(com|bg)/gm) && password.length > 0) {
    username = document.createTextNode(`Username: ${username}`)
    email = document.createTextNode(`Email: ${email}`)
    password = document.createTextNode(`Password: ${'*'.repeat(password.length)}`)

    let createdHeading = document.createElement('h1')
    createdHeading.innerText = 'Successful registration!'
    let brTag = document.createElement('br')
    let brTag2 = document.createElement('br')

    let resultElement = document.getElementById('result')
    resultElement.appendChild(createdHeading)
    resultElement.appendChild(username)
    resultElement.appendChild(brTag)
    resultElement.appendChild(email)
    resultElement.appendChild(brTag2)
    resultElement.appendChild(password)

    usernameElement.value = ''
    emailElement.value = ''
    passwordElement.value = ''
  }
}
