import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router'
import { loginUser } from '../../action.js'


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
const styles = {
  card: {
    marginTop: 100,
    display: 'flex',
    width: 400,
    flexWrap: 'wrap'
  },
  bullet: {
    display: 'block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontFamily: 'pacifico',
    marginBottom: 1,
    fontSize: 28,
  },
  pos: {
    marginBottom: 12,
  },
};


class LoginContainer extends Component{
    state = {
      username: '',
      password: ''
    }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.loginUser(this.state.username, this.state.password)
  }

  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  render(){
    const { classes } = this.props;
    return  this.props.loggedIn ?(
      <Redirect to="/map" />
    ) : (
      <center>
      <Card className={classes.card}>
        <CardContent>
          <form autoComplete="off">
            <Typography className={classes.title} color="textSecondary">
              Login
            </Typography>

            <Typography className={classes.bullet} color="textSecondary">
              Username
            </Typography>

            <TextField
              name='username'
              placeholder= {this.state.username}
              value= {this.state.username}
              margin="normal"
              onChange={this.changeEverything}
              variant="outlined"
            />

            <Typography className={classes.bullet} color="textSecondary">
              Password
            </Typography>

            <TextField
              name='password'
              placeholder= {this.state.password}
              value= {this.state.password}
              margin="normal"
              type="password"
              onChange={this.changeEverything}
              variant="outlined"
            />

          </form>

        </CardContent>
        <CardActions>
          <Button onClick={this.onSubmit} color={'secondary'} size="large">Submit</Button>
        </CardActions>
      </Card>
      <Typography className={classes.bullet} color="textSecondary">
        Not a user? <a href="/signup">Sign up!</a>
      </Typography>
      </center>
    );
  }
}

LoginContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})


const stylesMap = withStyles(styles)

const connectMap = connect(mapStateToProps, { loginUser })

export default compose(stylesMap, connectMap)(LoginContainer)
