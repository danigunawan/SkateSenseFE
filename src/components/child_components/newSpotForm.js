import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSkateSpots, fetchCurrentUser } from '../../action'
import FlatButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux'
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  card: {
    display: 'flex',
    width: 400,
    flexWrap: 'wrap'
  },
  bullet: {
    fontSize: 25,
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
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class newSpotForm extends Component {
  constructor(props){
    super(props)
    this.state={
      SpotName: '',
      BustFactor: '',
      Photo: '',
      Description: ''
    }
    console.log('newspotsform props', this.props);
  }


  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  handleFileUpload = (e) => {
  this.setState({
    Photo: e.target.files[0],
  })
};

  onSubmit = (e) =>{
    e.preventDefault()
    let data = new FormData()
    data.append('name', this.state.SpotName)
    data.append('country', 'n/a')
    data.append('city', 'n/a')
    data.append('state', 'n/a')
    data.append('latitude', this.props.latitude())
    data.append('longitude', this.props.longitude())
    data.append('description', this.state.Description)
    data.append('bust_factor', 1)
    data.append('skatephoto', this.state.Photo)
    data.append('user_id', this.props.currentUser.user.id)

    fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/skate_spots`, {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r=>r.json())
    .then(data=>this.props.getSkateSpots())
    .then(data=>this.props.newMarkerCreation(data))
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
      <Card className={classes.card}>
        <CardContent>
          <form autoComplete="off">
            <Typography className={classes.title} color="textSecondary">
              Create New Skate Spot
            </Typography>

              <TextField
                name='SpotName'
                id="standard-name"
                placeholder= 'SpotName'
                value= {this.state.SpotName}
                margin="normal"
                onChange={this.changeEverything}
                variant="outlined"
              />

              <TextField
                name='Description'
                id="standard-name"
                placeholder= 'Description'
                value= {this.state.Description}
                margin="normal"
                onChange={this.changeEverything}
                variant="outlined"
                fullWidth
              />

              <input
              name="Photo"
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleFileUpload}
              />

              <label htmlFor="contained-button-file">
                <Button onChange={this.handleFileUpload} variant="contained" component="span" className={classes.button}>
                Photo Upload
                </Button>
              </label>

          </form>
          </CardContent>
        <CardActions>
          <Button onClick={this.onSubmit} size="large">Submit</Button>
        </CardActions>
      </Card>

      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
      getSkateSpots: () => dispatch(getSkateSpots()),
      fetchCurrentUser: () => dispatch(fetchCurrentUser)
    }
}
// ENDED HERE. TRYING TO GET PROPS FROM PARENT COMPONENT AND REDUX STORE

const mapStateToProps = (state, stateProps) =>{
  console.log('NewSPotForm stateProps', stateProps);
  return{
    currentUser: state.user
  }
}

const stylesMap = withStyles(styles)

const connectMap = connect(mapStateToProps, mapDispatchToProps)

export default compose(stylesMap, connectMap)(newSpotForm)
