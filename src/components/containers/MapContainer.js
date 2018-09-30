import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import NewSpotForm from '../child_components/newSpotForm'
import LikeButton from '../child_components/likeButton'
import BookmarkButton from '../child_components/bookmarkButton'
import SkateSpotPageButton from '../child_components/spotProfileButton'
import { getSkateSpots } from '../../action'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {Provider} from 'react-redux'
import store from '../../store'
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions'

class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      image: '',
      fields: {
        location: {
          lat: 33.1631037,
          lng: -117.3286687
        }
      },
      spots: []
    }
}

  componentWillReceiveProps(nextProps) {
     if(nextProps.geoLocation.latitude !== this.state.fields.location.lat) { // You might need to have a deep comparison here if columns is not immutable or a nested obejct. You can use _.isEqual from lodash in that case
         this.setState({
           fields:{
             location:{
               lat: nextProps.geoLocation.latitude,
               lng: nextProps.geoLocation.longitude
             }
           }
         })
     }
   }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        showingNewInfoWindow: false
      })

    }
  }

  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      image: marker.image.url,
      showingNewInfoWindow: false,
    })}

  newMarkerCreation = (props) =>{
    props = props.payload[props.payload.length-1]
    this.setState({
      selectedPlace:props,
      activeMarker: this.state.newActiveMarker,
      showingInfoWindow: true,
      image: props.skatephoto.url,
      showingNewInfoWindow: false
    })
  }

  newMarkerClick = (props, marker, e) =>{
    this.setState({
      showingInfoWindow: false,
      newSelectedPlace: props,
      newActiveMarker: marker,
      showingNewInfoWindow: true
  })}

  addMarker = (location, map) => {
    this.setState(prev => ({
      showingInfoWindow: false,
      fields: {
        ...prev.fields,
        location
      }
      }));
      map.panTo(location);
    };


  onInfoWindowOpen = (props, e) => {
      const btnSet = (
        <div>
          <LikeButton marker={this.state.activeMarker}/>
          <BookmarkButton marker={this.state.activeMarker}/>
          <SkateSpotPageButton />

          <IconButton href={`https://www.google.com/maps/dir//${this.state.activeMarker.position.lat()},${this.state.activeMarker.position.lng()}`}
            target="_blank"
            color="inherit"
            aria-label="Open drawer"
            >
            <DirectionsIcon />
          </IconButton>
        </div>
      )
      ReactDOM.render(
        <Provider store={store}>
          {btnSet}
        </Provider>,
        document.getElementById("iwc")
      )
    }

  onNewInfoWindowOpen = (props, e) => {
    const wholeForm = (
      <div>
        <NewSpotForm latitude={this.state.fields.location.lat} longitude={this.state.fields.location.lng} newMarkerCreation={this.newMarkerCreation}/>
      </div>
    )
    ReactDOM.render(
      <Provider store={store}>
        {wholeForm}
      </Provider>,
      document.getElementById("newMarker")
    )
  }

  render() {
    return (
      <Map google={this.props.google}
          style={{width: "100%",height: "100%"}}
          initialCenter={{lat: 33.1631037,lng: -117.3286687}}
          zoom={14}
          center={{lat: this.state.fields.location.lat, lng: this.state.fields.location.lng}}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}>

        <Marker position={this.state.fields.location} onClick={this.newMarkerClick}/>

        {this.props.skateSpots.map(spot => <Marker key={spot.id} id={spot.id} currentUserid={1} onClick={this.onMarkerClick} title={spot.name} bustFactor={spot.bust_factor} description={spot.description} image={spot.skatephoto} position={{lat:spot.latitude, lng:spot.longitude}} />)}

          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onOpen={e => {this.onInfoWindowOpen(this.props, e)}}>

              <img src={`http://localhost:3000${this.state.image}`} height='300' width='370' alt='yo'></img>
                  <h2>{this.state.selectedPlace.title}</h2>
                  <h4>{this.state.selectedPlace.description}</h4>
              <div id="iwc" />
          </InfoWindow>

          <InfoWindow
          marker={this.state.newActiveMarker}
          visible={this.state.showingNewInfoWindow}
          onOpen={e => {this.onNewInfoWindowOpen(this.props, e)}}>
          <div id="newMarker" />
          </InfoWindow>
    </Map>
    )
  }
}

const mapStateToProps = state => {
  return {
    skateSpots: state.skate_spots,
    geoLocation: state.geoLocation
  }
}

const connectedMap = connect(mapStateToProps)(MapContainer)
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck')
})(connectedMap)
// AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
// AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck
// AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ
