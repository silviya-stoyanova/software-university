// This file is used to re-render a component from another file.

// When a user logs in, the header and the navigation components have to be re-rendered.
// The header (and the navigation) has two functions which role is to
// update the state of isLogged property in this.state
// These functions are subscribed in subscriptions.loginUser
// and subscriptions.logoutUser
// They are triggered respectively in login-register.jsx and in logout.js

const subscriptions = {
    loginUser: [],
    logoutUser: []
}

export default {
    // events: {
    //     loginUser: 'loginUser'
    // },

    subscribe: (eventName, func) => {
        subscriptions[eventName].push(func)
    },

    trigger: (eventName, data) => {
        subscriptions[eventName].forEach(fn => fn(data))
    }
}