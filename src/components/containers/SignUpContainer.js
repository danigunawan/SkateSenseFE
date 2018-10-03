import React, {Component} from 'react'
import FlatButton from '@material-ui/core/Button';

class SignUpContainer extends Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      photo: '',
    }
  }

  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  submitFunction = (e) =>{
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/users',{
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        photo: 'n/a',
      }),
      headers: {
        'Content-Type': 'application/json'}
    }).then(r=>r.json())

  }

  render(){
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
// <input type="submit" value="Submit"/>
export default SignUpContainer
