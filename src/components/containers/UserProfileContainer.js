import React, { Component } from 'react'
import { getUserData } from '../../action'
import { connect } from 'react-redux'
import SkateSpotItem from '../child_components/SkateSpotItem'
import skatePhoto from '../../assets/hollywood16.png'

class UserProfileContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      myBookmarks: [{name:'test'}],
      mySkateSpots: [{name:'test', photo: skatePhoto}]
    }
  }

  async componentDidMount(){
    const response = await this.props.getUserData()
    this.setState({ myBookmarks: response.bookmarks, mySkateSpots: response.skate_spots });
  }

  render(){
    console.log('mystate', this.state)
    return(
      <div>
        <h1>Profile Page</h1>
        <center><h2>My Skate Spots</h2></center>
        {this.state.mySkateSpots.map(spot => <SkateSpotItem key={spot.id} spot={spot}/>)}
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  return {
    userData: state.user_data,
    loadingData: state.loadingData
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserData: () => dispatch(getUserData()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer)
