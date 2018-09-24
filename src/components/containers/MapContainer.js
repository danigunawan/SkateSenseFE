import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react'
import data from '../dummy_data'
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';

export class MapContainer extends Component {
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
      }
  }
}


  // GET GEOLOCATION!!!

  // storeGeoLocation = (lat, lon) =>{
  //   this.setState({GeoLat: lat,
  //                 GeoLon: lon})
  // }





  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        showingNewInfoWindow: false
      })
    }
  }

    // navigator.geolocation.getCurrentPosition((position) => {this.storeGeoLocation(position.coords.latitude, position.coords.longitude)})

  onMarkerClick = (props, marker, e) =>{
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

  onLike = (e) => {
    console.log('LIKE!')
  }


  onBookmark = (e) =>{
    console.log('BOOKMARKED!')
  }

  onSkateSpotPageClick = (e) =>{
    console.log('Hit the spot page!')
  }

  onSubmittingNewSpot = (e) =>{
    console.log(e);
  }

  // Allows the buttons on the InfoWindow to work
  onInfoWindowOpen(props, e) {
      const likeButton = (
          <Button onClick={this.onLike} variant="contained" color="primary">Like</Button>
      );
      const bookmarkButton = (
          <Button onClick={this.onBookmark} variant="contained" color="primary">Bookmark</Button>
      )
      const skateSpotPageButton = (
          <Button onClick={this.onSkateSpotPageClick} variant="contained" color="primary">Spot Profile</Button>
      )

      const btnSet = (
        <div>
          {likeButton}
          {bookmarkButton}
          {skateSpotPageButton}
        </div>
      )

      ReactDOM.render(
        btnSet,
        document.getElementById("iwc")
      )
    }

  onNewInfoWindowOpen(props, e){
    const submitButton = (
      <Button onClick={this.onSubmittingNewSpot} variant="contained" color="primary">Submit</Button>
    )

    ReactDOM.render(
      submitButton,
      document.getElementById("newMarker")
    )
  }



  render() {
    return (
      <Map google={this.props.google}
          style={{
            width: "100%",
            height: "100%"
          }}
          initialCenter={{
              lat: 33.1631037,
              lng: -117.3286687
            }}
          zoom={14}
          onClick={(t, map, c) => this.addMarker(c.latLng, map)}
          >

        <Marker position={this.state.fields.location} onClick={this.newMarkerClick}/>

        {data.spots.map(spot => <Marker key={spot.id} onClick={this.onMarkerClick} title={spot.name} image={spot.image} position={{lat:spot.latitude, lng:spot.longitude}} />)}


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

            <form>
              Spot Name <input type='text'/><br/>
              Bust factor
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select> <br/>
              Spot Photo <input type="file" />
            </form>
            <div id="newMarker" />

          </InfoWindow>




    </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ')
})(MapContainer)
