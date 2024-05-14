import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    naidu: false,
    empty: '',
  }

  oneBlock = event => {
    this.setState({userId: event.target.value})
  }

  twoBlock = event => {
    this.setState({pin: event.target.value})
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 600,
      path: '/',
    })
    history.replace('/')
  }

  fail = empty => {
    this.setState({naidu: true, empty})
  }

  BankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  render() {
    const {userId, pin, naidu, empty} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-container">
        <div className="card-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="img"
            />
          </div>
          <form className="form-element" onSubmit={this.BankLogin}>
            <h1 className="header">Welcome Back!</h1>
            <div className="card-inputs">
              <label htmlFor="user" className="lab">
                User ID
              </label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="input-elenemt"
                type="text"
                value={userId}
                onChange={this.oneBlock}
              />
            </div>
            <div className="card-inputs">
              <label htmlFor="pin" className="lab">
                PIN
              </label>
              <input
                id="pin"
                placeholder="Enter Pin"
                className="input-elenemt"
                type="password"
                value={pin}
                onChange={this.twoBlock}
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
            <div className="card-text">
              {naidu === true && <p className="error-msg">{empty}</p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
