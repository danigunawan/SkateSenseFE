import React, { Component, Fragment } from 'react';
// import MapContainer from './MapContainer'
import MapContainer from './containers/MapContainer'
import { getSkateSpots } from '../action'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import UserProfileContainer from './containers/UserProfileContainer'
import SkateSpotContainer from './containers/SkateSpotContainer'
import LoginContainer from './containers/LoginContainer'
import SignUpContainer from './containers/SignUpContainer'
import BookmarkContainer from './containers/BookmarkContainer.js'
import NavBar from './Navbar'


class App extends Component {


  componentDidMount(){
    this.props.getSkateSpots()
  }

  render() {

    return (
            <Fragment>
              <NavBar />
              <Switch>
                <Route exact path="/" render={ () => <Redirect to="/signup" /> } />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/map" component={MapContainer} />
                <Route exact path="/signup" component={SignUpContainer} />
                <Route exact path="/bookmarks" component={BookmarkContainer}  />
                <Route exact path="/profile" component={UserProfileContainer} />
                <Route exact path="/spot" component={SkateSpotContainer} />
              </Switch>
          </Fragment>
      )
    }
}

function mapStateToProps(state) {
  return {
    users: state.users,
    skate_spots: state.skate_spots
  }
}

function mapDispatchToProps(dispatch) {
    return {
      getSkateSpots: () => dispatch(getSkateSpots())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// dispatch always sends an action
// an action is always { } w/ 2 keys
// type & payload
// payload -> return value of some function
// type -> "GET_USERS"
// dispatch({type: "GET_USERS", payload: data from fetch})
