import React, { Fragment, Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/common/header'
import Footer from './components/common/footer'
import Navigation from './components/common/navigation'
import MyRoutes from './components/routes/router'
// import './App.css';
// import './style/notifications.css'
import './style/post.css'
import './style/site.css'
import './style/submit.css'

class App extends Component {
  // all files that include <Route /> or <Link /> must be wrapped in a single BrowserRouter!
  constructor(props) {
    super(props)

    this.state = {
      isLogged: false,
      username: null
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let userInfo = {}

    if (sessionStorage.getItem('authtoken')) {
      userInfo = {
        isLogged: !!sessionStorage.getItem('authtoken'),
        username: sessionStorage.getItem('username')
      }
    }
    return userInfo
  }

  render() {
    return (
      <Fragment>

        <ToastContainer />

        <BrowserRouter>
          <Header username={this.state.username} />
          <Navigation />
          <MyRoutes isLogged={this.state.isLogged} />
        </BrowserRouter>

        <Footer />
      </Fragment >
    )
  }
}

export default App;