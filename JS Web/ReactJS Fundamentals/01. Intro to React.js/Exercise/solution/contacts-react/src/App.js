import React from 'react';
import './App.css';
const contactsDb = require('./contacts.json')

function showDetails(index) {
  let contact = contactsDb[index]
  document.getElementById('firstName').textContent = contact.firstName
  document.getElementById('lastName').textContent = contact.lastName
  document.getElementById('phone').textContent = contact.phone
  document.getElementById('email').textContent = contact.email
}

function Contact() {
  let contacts = []

  contactsDb.map((c, index) => {
    return contacts.push(
      <div className="contact" onClick={() => showDetails(index)} key={index}>
        <span className="avatar small">&#9787;</span>
        <span className="title">{c.firstName} {c.lastName}</span>
      </div>
    )
  })

  return contacts
}

function Details() {
  return (
    <div className="content">

      <div className="info">
        <div className="col">
          <span className="avatar">&#9787;</span>
        </div>
        <div className="col">
          <span id="firstName" className="name">Ivan</span>
          <span id="lastName" className="name">Ivanov</span>
        </div>
      </div>

      <div className="info">
        <span id="phone" className="info-line">&phone; 0887 123 456</span>
        <span id="email" className="info-line">&#9993; i.ivanov@gmail.com</span>
      </div>

    </div>
  )
}

function App() {
  return (
    <div className="container">
      <header>&#9993; Contact Book </header>
      <div id="book">

        <div id="list">
          <h1>Contacts</h1>
          < div className="content" >
            <Contact />
          </div>
        </div>

        <div id="details">
          <h1>Details</h1>
          <Details />
        </div>
      </div>

      <footer>Contact Book SPA &copy; 2017</footer>
    </div>
  );
}

export default App;
