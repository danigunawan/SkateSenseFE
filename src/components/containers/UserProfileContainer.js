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
import { fetchCurrentUser } from '../../action'
import withAuth from '../../hocs/withAuth.js'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
const styles = {
  card: {
    marginTop: 50,
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

class UserProfileContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    }

  }

  async componentDidMount(){
    // const response = this.props.currentUser.user.user
  }

  handleChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) =>{
    console.log(e.target.value);
  }

  render(){
    const { classes } = this.props;
    return (
      <center>
      <Card className={classes.card}>
        <CardContent>
          <form autoComplete="off">
            <Typography className={classes.title} color="textSecondary">
              Edit Profile
            </Typography>

            <Typography className={classes.bullet} color="textSecondary">
              Username
            </Typography>

              <TextField
                name='username'
                id="standard-name"
                placeholder={this.props.currentUser.user.username}
                value= {this.state.username}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
              />

              <Typography className={classes.bullet} color="textSecondary">
                First Name
              </Typography>

              <TextField
                name='firstName'
                id="standard-name"
                placeholder={this.props.currentUser.user.first_name}
                value= {this.state.firstName}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
              />

              <Typography className={classes.bullet} color="textSecondary">
                Last Name
              </Typography>

              <TextField
                name='lastName'
                id="standard-name"
                placeholder={this.props.currentUser.user.last_name}
                value= {this.state.lastName}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
              />

              <Typography className={classes.bullet} color="textSecondary">
                Email
              </Typography>

              <TextField
                name='email'
                id="standard-name"
                placeholder={this.props.currentUser.user.email}
                value= {this.state.email}
                margin="normal"
                onChange={this.handleChange}
                variant="outlined"
              />
          </form>

        </CardContent>
        <CardActions>
          <Button onClick={this.onSubmit} color={'secondary'} size="large">Submit</Button>
        </CardActions>
      </Card>
      </center>
    );
  }
}

UserProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>{
  return{
    currentUser: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser)
    }
}


const stylesMap = withStyles(styles)

const connectMap = connect(mapStateToProps, mapDispatchToProps)


export default withAuth(compose(stylesMap, connectMap)(UserProfileContainer))
