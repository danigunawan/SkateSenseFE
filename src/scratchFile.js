import React, { Component } from 'react'
import { getUserData } from '../../action'
import { getSkateSpots } from '../../action'
import { connect } from 'react-redux'
import SkateSpotItem from '../child_components/SkateSpotItem'
import Grid from '@material-ui/core/Grid';

class BookmarkContainer extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return(
      <div>
        <center><h1> Bookmarks </h1></center>
        <Grid container spacing={18}>
          { this.state.myBookmarks ? this.state.myBookmarks.map(spot => <SkateSpotItem spot={spot} /> ): null }
        </Grid>
      </div>
    )
  }

  async componentDidMount(){
    const response = await this.props.getUserData()
    this.setState({ myBookmarks: response.skate_spots})
  }

  getBookmarkedSpots = () =>{
    if (this.state.allSkateSpots.payload.length > 0){

      console.log('mybookmarked spot')
      // this.setState({myBookmarkedSpots: [...this.state.myBookmarkedSpots, myBookmarkedSpot]})
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
