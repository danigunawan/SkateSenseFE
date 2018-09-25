import React from 'react'
import FlatButton from '@material-ui/core/Button';

const LoginContainer = () =>{

  function submitFunction(e){
    e.preventDefault()
    console.log('got here!');
  }

  return(
    <div>
    Login! <br/>
      <form onSubmit={submitFunction}>
        Username: <input type="text"/><br/>
        Password: <input type="password"/><br/>
        <FlatButton type="submit" variant="contained" color="primary">Submit</FlatButton>
      </form>
      Not a user? <a href="/signup">Sign up!</a>
    </div>
  )
}

export default LoginContainer
