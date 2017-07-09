import React from 'react'
import {auth} from 'firebase'

class LoginButton extends React.Component {
  constructor(props) {
    super(props)
    this.auth = auth()
    this.state = {user: null}
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }


  componentWillMount () {
    this.loginObserver = this.auth.onAuthStateChanged(user=> {
      this.setState({user})
    })
  }

  login (e) {
    const provider = new auth.GoogleAuthProvider()
    this.auth.signInWithRedirect(provider)
  }

  logout () {
    this.auth.signOut().then(()=> {
      const {logOut} = this.props
      if (typeof logOut === 'function') {
        logOut()
      }
    })
  }

  render () {
    const {user} = this.state
    return <div className="auth-wrapper">
      {user ? <button onClick={this.logout}>Logout</button>: <button onClick={this.login}>Login</button>}
    </div>
  }
}

export default LoginButton