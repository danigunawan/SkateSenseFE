import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions'
import BookMarkButton from './bookmarkButton.js'

const styles = theme => ({
  title:{
    fontSize: 25,
    fontFamily: 'ubuntu'
  },
  root: {
    flexGrow: 1,
    maxWidth: 500,
    padding: theme.spacing.unit * 2,
    margin: 20
  },
  description:{
    fontSize: 20,
    wordWrap: 'break-word'
  },
  image: {
    width: 128,
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

class SkateSpotItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      spot: {skatephoto:{url:'a'}},

    }
  }

  async componentDidMount(){
    await this.setState({spot: this.props.spot, spotphoto: this.props.spot.skatephoto})
  }

    render(){
      console.log(this.state.spot);
      const { classes } = this.props;
      return(
        <Grid item>
          <Paper className={classes.root}>
            <Typography className={classes.title}>
              {this.props.spot.name}
            </Typography><br/><br/><br/><br/>
            <img src={`http://localhost:3000/${this.props.spot.skatephoto.url}`} height='300' width='400'/>
            <Typography className={classes.description}>
              {this.props.spot.description}
            </Typography>
              <IconButton href={`https://www.google.com/maps/dir//${this.props.spot.latitude},${this.props.spot.longitude}`}
                target="_blank"
                color="inherit"
                aria-label="Open drawer"
                >
                <DirectionsIcon />
              </IconButton>
          </Paper>
      </Grid>
      )
    }
}

SkateSpotItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SkateSpotItem)
