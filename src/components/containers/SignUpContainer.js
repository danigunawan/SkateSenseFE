import React, {Component} from 'react'
import FlatButton from '@material-ui/core/Button';
import { createUser } from '../../action.js'
import { connect } from 'react-redux'

class SignUpContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      photo: 'n/a',
    }
  }

  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  submitFunction = (e) =>{
    e.preventDefault()
    this.props.createUser(this.state.username, this.state.password, this.state.first_name, this.state.last_name, this.state.email, this.state.photo)

    this.setState({
     username: '',
     password: '',
     first_name: '',
     last_name: '',
     photo: ''
   })

  }

  render(){
    console.log("Singup Props in Signup Container", this.props);
    return(
      <div>
        Sign up! <br/>
          <form onSubmit={this.submitFunction}>
            Username: <input name="username" value={this.state.username} type="text" onChange={this.changeEverything}/><br/>
            Password: <input name="password" value={this.state.password} type="password" onChange={this.changeEverything}/><br/>
            First Name: <input name="first_name" value={this.state.first_name} type="text" onChange={this.changeEverything}/><br/>
            Last Name: <input name="last_name" value={this.state.last_name} type="text" onChange={this.changeEverything}/><br/>
            Email Name: <input name="email" value={this.state.email} type="text" onChange={this.changeEverything}/><br/>

            <FlatButton type="submit" variant="contained" color="primary">Submit</FlatButton>
          </form>
        Already a user? <a href="/login">Login</a>
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

export default connect(mapStateToProps, { createUser })(SignUpContainer)
