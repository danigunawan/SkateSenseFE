import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import image from './hollywood16.png';

export class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      GeoLat:40.705094100000004,
      GeoLon:-74.014248,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
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

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })



  render() {
    console.log(this.state)
    return (
      <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        zoom={14}>
      <Marker
        onClick={this.onMarkerClick}
        title={'The marker`s title will appear as a tooltip.'}
        name={'SOMA'}
        position={{lat: 37.778519, lng: -122.405640}} />
      <Marker />
      <Marker
        onClick={this.onMarkerClick}
        name={'HollyWood 16 Stair'}
        position={{lat: 37.778519, lng: -122.405640}}
        icon={{
          url: `${image}`,
          anchor: new this.props.google.maps.Point(32,32),
          scaledSize: new this.props.google.maps.Size(64,64)
        }} />
        <Marker />


      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
      </InfoWindow>
    </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ')
})(MapContainer)


//
