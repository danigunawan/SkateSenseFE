// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';
// import Marker from '../child_components/Marker'
// //
// // const AnyReactComponent = ({ text }) => <div>{text}</div>;
// //
// // class MapContainer extends Component {
// //   static defaultProps = {
// //     center: {
// //       lat: 34.0991694,
// //       lng: -118.3422401
// //     },
// //     zoom: 11
// //   };
// //
// //   _onClick = () => {console.log('got here!')}
// //
// //   render() {
// //     return (
// //       // Important! Always set the container height explicitly
// //       <div style={{ height: '100vh', width: '100%' }}>
// //         <GoogleMapReact
// //           bootstrapURLKeys={{ key: 'AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ' }}
// //           defaultCenter={this.props.center}
// //           defaultZoom={this.props.zoom}
// //           onChildClick={this._onClick}
// //
// //           >
// //
// //           <Marker lat={34.0991694} lng={-118.3422401} text={'Hollywood High 16'}/>
// //           <Marker lat={33.1631037} lng={-117.3286687} text={'Carlsbad Gap'}/>
// //           <Marker lat={33.6373059} lng={-117.6896714} text={'El Toro'}/>
// //
// //         </GoogleMapReact>
// //       </div>
// //     );
// //   }
// // }
// //
// // export default MapContainer;
//
// class Map extends Component {
//
//   onGoogleApiLoaded = ({map, maps}) => {
//     this.map = map;
//     this.maps = maps;
//     this.infowindow = new maps.InfoWindow();
//     var address = {lat: 34.0991694, lng: -118.3422401}
//     var service = new maps.places.PlacesService(map);
//     service.nearbySearch({
//       location: address,
//       radius: 2000,
//       types: ['school']
//     }, this.callback);
//   }
//
//   callback = (results, status) => {
//     for(var i = 0; i < results.length; i++) {
//       this.renderMarkers(results[i]);
//     }
//   }
//
//   handleClick = (e) => {
//     console.log('got here!');
//   }
//
//   renderMarkers = (place) => {
//     let marker = new this.maps.Marker({
//       position: {lat: parseFloat(place.geometry.location.lat()), lng: parseFloat(place.geometry.location.lng())},
//       map: this.map,
//       title: 'Hello World!'
//     })
//
//     marker.addListener('click', () => {
//       this.infowindow.setContent('<Button onClick={handleClick()}>Click me</Button>');
//       this.infowindow.open(this.map, marker);
//     })
//
//
//   }
//
//   render(){
//     return  (
//         <div style={{height: '100vh'}}>
//           <GoogleMapReact
//             bootstrapURLKeys={{
//               key: 'AIzaSyDiNwCezSsFJzr1kzCqAwnoOlblT5KXNwQ',
//               libraries: 'places'
//             }}
//             onGoogleApiLoaded={this.onGoogleApiLoaded}
//           defaultCenter= {{lat: 34.0991694, lng: -118.3422401}}
//             defaultZoom={15}
//           />
//         </div>
//       );
//   }
// }
//
// export default Map
