import React from 'react'
import {auth} from 'firebase'

export default class Auth extends React.Component {

  login(e) {
    const provider = new auth.GoogleAuthProvider()
    auth().signInWithRedirect(provider)
  }
  render () {
    return <div className="auth-wrapper">
      <button onClick={this.login}>Login</button>
    </div>
  }
}