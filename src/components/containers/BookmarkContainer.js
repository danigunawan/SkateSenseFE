import React, { Component } from 'react'
import { getUserData } from '../../action'
import { getSkateSpots } from '../../action'
import { connect } from 'react-redux'


class BookmarkContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      myBookmarks: '',
      allSkateSpots: ''
    }
  }
  render(){
    console.log(this.state)
    return(
      <h1>Bookmark page</h1>
    )
  }


  async componentDidMount(){
    const response = await this.props.getUserData()
    const response2 = await this.props.getSkateSpots()
    this.setState({ myBookmarks: response.bookmarks, allSkateSpots: response2 },() => this.getBookmarkedSpots())
  }


  getBookmarkedSpots = () =>{
    if (this.state.allSkateSpots.payload.length > 0){
      let myBookmarkedSpot = this.state.allSkateSpots.payload.filter(skateSpot => {
        return this.state.myBookmarks.filter(bookmark => {
          return bookmark.skate_spot_id === skateSpot.id
        })
      })
      console.log(myBookmarkedSpot)
    }
  }


}




const mapStateToProps = (state) => {
  return {
    userData: state.user_data,
    skateSpots: state.skateSpots,
    loadingData: state.loadingData
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUserData: () => dispatch(getUserData()),
      getSkateSpots: () => dispatch(getSkateSpots())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkContainer)
