import React from 'react'
import {auth} from 'firebase'

export default (props) => {

  const login = (e) => {
    const provider = new auth.GoogleAuthProvider()
    auth().signInWithRedirect(provider)
  }
  return <div className="auth-wrapper">
    <button onClick={login}>Login</button>
  </div>
}