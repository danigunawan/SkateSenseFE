import React, { Component } from 'react';
// import MapContainer from './MapContainer'
import MapContainer from './containers/MapContainer'
import { getUsers } from '../action'
import { getSkateSpots } from '../action'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import UserProfileContainer from './containers/UserProfileContainer'
import SkateSpotContainer from './containers/SkateSpotContainer'
import SignUpContainer from './containers/SignUpContainer'
import LoginContainer from './containers/LoginContainer'
import BookmarkContainer from './containers/BookmarkContainer.js'
import NavBar from './Navbar'



class App extends Component {

  componentDidMount(){
    this.props.getUsers()
    this.props.getSkateSpots()
  }
 

  render() {
    return (
      <div>
        <NavBar />
        <Router>
          <div>
            <Route exact path="/" component={MapContainer} />
            <Route exact path="/bookmarks" component={BookmarkContainer} />
            <Route exact path="/signup" component={SignUpContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/profile" component={UserProfileContainer} />
            <Route exact path="/spot" component={SkateSpotContainer} />
          </div>
        </Router>
    </div>
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
      getUsers: () => dispatch(getUsers()),
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
