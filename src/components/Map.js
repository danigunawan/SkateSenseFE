import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import data from './dummy_data'

export class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      // GeoLat:40.705094100000004,
      // GeoLon:-74.014248,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      image: require(`./hollywood16.png`)
    }
  }

  storeGeoLocation = (lat, lon) =>{
    this.setState({GeoLat: lat,
                  GeoLon: lon})
  }


  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

    // navigator.geolocation.getCurrentPosition((position) => {this.storeGeoLocation(position.coords.latitude, position.coords.longitude)})

  onMarkerClick = (props, marker, e) =>{
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      image: require(`./${marker.image}.png`)

    })}



  render() {
    return (
      <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}
        initialCenter={{
            lat: 33.1631037,
            lng: -117.3286687
          }}
        >

      {data.spots.map(spot => <Marker key={spot.id} onClick={this.onMarkerClick} title={spot.name} image={spot.image} position={{lat:spot.latitude, lng:spot.longitude}} />)}

      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div>
            {console.log(this.state.image)}
            <img src={this.state.image} height='300' width='370'></img>
            <h2>{this.state.selectedPlace.title}</h2>
            <h2>{this.state.selectedPlace.description}</h2>
          </div>
      </InfoWindow>

    </Map>
    )
  }
}

//
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ')
})(MapContainer)
