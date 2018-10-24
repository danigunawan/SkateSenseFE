import React, { Component } from 'react'
import FlatButton from '@material-ui/core/Button';
import { Redirect } from 'react-router'
import { loginUser } from '../../action.js'
import { connect } from 'react-redux'

class LoginContainer extends Component{
    state = {
      username: '',
      password: ''
    }

  submitFunction = (e) => {
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password)
  }

  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
      console.log('loginform', this.props);
    return this.props.loggedIn ? (
        <Redirect to="/" />
      ) : (
      <div>
      Login! <br/>
        <form onSubmit={this.submitFunction}>
          Username: <input name="username" value={this.state.username} type="text" onChange={this.changeEverything}/><br/>
          Password: <input name="password" value={this.state.password} type="text" onChange={this.changeEverything}/><br/>
          <FlatButton type="submit" variant="contained" color="primary">Submit</FlatButton>
        </form>
        Not a user? <a href="/signup">Sign up!</a>
      </div>
    )
  }
}

const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default connect(mapStateToProps, { loginUser })(LoginContainer)
