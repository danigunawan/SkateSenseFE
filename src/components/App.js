import React, { Component } from 'react';
// import MapContainer from './MapContainer'
import MapContainer from './containers/MapContainer'
import { getUsers } from '../action'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Profile from './containers/Profile'

class App extends Component {

  componentDidMount(){
    // fetch('http://localhost:3000/api/v1/users').then(r=>r.json()).then(data=>console.log(data))
    this.props.getUsers()

  }

  render() {
    return (
      <Router>
        <div>
          <MapContainer />
          <Route exact path="/" component={MapContainer} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }

}

function mapDispatchToProps(dispatch) {
    return {
      getUsers: () => dispatch(getUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


// dispatch always sends an action
// an action is always { } w/ 2 keys
// type & payload
// payload -> return value of some function
// type -> "GET_USERS"
// dispatch({type: "GET_USERS", payload: data from fetch})
