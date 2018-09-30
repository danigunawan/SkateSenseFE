import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions'

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
      return(
        <div>
          <center>
            <h1> Bookmarks </h1>
            <h2>{this.props.spot.name}</h2>
              <img src={`http://localhost:3000/${this.props.spot.skatephoto.url}`} height='300' width='400'/>
            <h3>{this.props.spot.description}</h3><br/>
          </center>

          <IconButton href={`https://www.google.com/maps/dir//${this.props.spot.latitude},${this.props.spot.longitude}`}
            target="_blank"
            color="inherit"
            aria-label="Open drawer"
            >
            <DirectionsIcon />
          </IconButton>

        </div>
      )
    }
}

export default SkateSpotItem
