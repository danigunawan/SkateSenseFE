import React, { Component } from 'react'
import { getUserData } from '../../action'
import { connect } from 'react-redux'

class UserProfileContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      myBookmarks: '',
      mySkateSpots: ''
    }
  }

  componentDidMount(){
    this.props.getUserData()
    .then(data=>{
      this.setState({myBookmarks:data.bookmarks, mySkateSpots:data.skate_spots})
    })
    .then(() => {
      this.waitForStuffToLoad()
    })
  }

  waitForStuffToLoad = () =>{
    let data = this.state.mySkateSpots[0].name ? this.state.mySkateSpots : null
    if (data !== null) {
      return this.state.mySkateSpots[0].name
    }else {
      console.log('data is null');
    }
  }

  render(){
    // console.log(this.state.mySkateSpots[0])
    return(
      <div>
        <h1>Profile Page</h1>
        <center><h2>MySpots</h2></center>

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
