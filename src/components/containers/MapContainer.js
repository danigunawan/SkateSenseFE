import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import data from '../dummy_data'
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

class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      image: require(`../../assets/hollywood16.png`),
      fields: {
        location: {
          lat: 33.1631037,
          lng: -117.3286687
        }
      },
      spots: []
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
    console.log(marker);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      image: require(`../../assets/${marker.image}.png`),
      showingNewInfoWindow: false
    })}

  newMarkerClick = (props, marker, e) =>{
    this.setState({
      showingInfoWindow: false,
      newSelectedPlace: props,
      newActiveMarker: marker,
      showingNewInfoWindow: true
  })}

  addMarker = (location, map) => {
    this.setState(prev => ({
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
          <LikeButton />
          <BookmarkButton />
          <SkateSpotPageButton />
        </div>
      )
      ReactDOM.render(
        btnSet,
        document.getElementById("iwc")
      )
    }

  onNewInfoWindowOpen = (props, e) => {
    const wholeForm = (
      <div>
        <NewSpotForm latitude={this.state.fields.location.lat()} longitude={this.state.fields.location.lng()}/>
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
    console.log(this.props.skateSpots);
    return (
      <Map google={this.props.google}
          style={{width: "100%",height: "100%"}}
          initialCenter={{lat: 33.1631037,lng: -117.3286687}}
          zoom={14}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}>

        <Marker position={this.state.fields.location} onClick={this.newMarkerClick}/>

        {this.props.skateSpots.map(spot => <Marker key={spot.id} onClick={this.onMarkerClick} title={spot.name} image={spot.photo} position={{lat:spot.latitude, lng:spot.longitude}} />)}

          <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onOpen={e => {this.onInfoWindowOpen(this.props, e)}}>
              <img src={this.state.image} height='300' width='370'></img>
                  <h2>{this.state.selectedPlace.title}</h2>
                  <h2>{this.state.selectedPlace.description}</h2>
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
    skateSpots: state.skate_spots
  }
}


const connectedMap = connect(mapStateToProps)(MapContainer)

// export default compose(
//   connect(mapStateToProps),
//   GoogleApiWrapper({
//   apiKey: ('AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck')
// })
// )(MapContainer)
export default GoogleApiWrapper({
  apiKey: ('AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck')
})(connectedMap)
// AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo
// AIzaSyD8eyGeIVO1m-lMAwJ21o3qiUPRiuFV_ck
// AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ
