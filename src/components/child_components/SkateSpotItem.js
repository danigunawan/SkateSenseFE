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
import BottomNavigation from '@material-ui/core/BottomNavigation';

const styles = theme => ({
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    wordWrap: 'break-word',
    whiteSpace: 'normal'
  },
  root: {
    flexGrow: 1,
    maxWidth: 300,
    height: 400,
    padding: theme.spacing.unit * 2,
    margin: 5,
    wordWrap: 'break-word',
    whiteSpace: 'normal',
  },
  description:{
    fontSize: 20,
    wordWrap: 'break-word',
    whiteSpace: 'normal',
  },
  image: {
    width: 64,
    height: 50,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '60%',
  },
});

class SkateSpotItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      spot: {skatephoto:{url:'a'}},
      bookmarked: true
    }
  }

  changeState = () =>{
    this.setState({
      bookmarked:false
    })
  }

  renderBookmark = () =>{
    if (this.state.bookmarked === true){
      const { classes } = this.props;
      return(
        <Grid item>
          <Paper className={classes.root}>
            <Typography className={classes.title}>
            {this.props.spot.name}
            </Typography>
            <img src={`http://localhost:3000/${this.props.spot.skatephoto.url}`} className={classes.img} height='300' width='400'/>
            <Typography className={classes.description} style={{wordWrap: 'break-word', whiteSpace: 'normal'}}>
              {this.props.spot.description}
            </Typography>


            <Grid container spacing={12} style={{display: 'inline-flex', verticalAlign: 'middle'}}>
              <Grid item xs={6}>
                <BookMarkButton marker={this.props.spot} changeState={this.changeState} style={{marginBottom:10}} />
              </Grid>

              <Grid item xs={6} >
                <IconButton href={`https://www.google.com/maps/dir//${this.props.spot.latitude},${this.props.spot.longitude}`}
                  target="_blank"
                  color="inherit"
                  aria-label="Open drawer"
                  style={{ bottom: 0}}
                  >
                  <DirectionsIcon />
                </IconButton>
              </Grid>
            </Grid>

          </Paper>
      </Grid>
      )
    }
    else{
      return(
        null
      )
    }
  }

  async componentDidMount(){
    await this.setState({spot: this.props.spot, spotphoto: this.props.spot.skatephoto})
  }

    render(){
      return(
        <div>
          {this.renderBookmark()}
        </div>
      )
    }
}

SkateSpotItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SkateSpotItem)
