import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { getUserData } from '../../action'
import { connect } from 'react-redux'

class BookmarkButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      bookmarked: false,
      markerID: this.props.marker.id,
      currentUserid: this.props.marker.currentUserid,
      currentBookmarkid: 'empty'
    }
    console.log('bookmark button props', window.location.href);
  }


  componentDidMount(){
    this.props.getUserData()
    .then(() => {
      this.checkIfUserBookmarkedPost()
    })
  }

  checkIfUserBookmarkedPost = () =>{
    let data = this.props.userData ? this.props.userData.bookmarks : null
    if (data !== null){
      const bookmarked = data.find(bookmarks=>(bookmarks.skate_spot_id === this.state.markerID))
      bookmarked ? this.setState({bookmarked:true, currentBookmarkid:bookmarked.id}) : null
    }
  }


  onBookmark = () => {
    console.log('BOOKMARKED!')
    fetch('http://localhost:3000/api/v1/bookmarks',{
      method: "POST",
      body: JSON.stringify({
        skate_spot_id:`${this.state.markerID}`,
        user_id: `${this.state.currentUserid}`
      }),
      headers: {
        'Content-Type': 'application/json'}
    }).then(r=>r.json()).then(data=>this.setState({bookmarked: true, currentBookmarkid: data.id}))
  }

  onUnBookmark = () => {
    console.log('UNBOOKMARKED!')
    fetch(`http://localhost:3000/api/v1/bookmarks/${this.state.currentBookmarkid}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'}
    }).then(r=>r.json()).then(data=>this.setState({bookmarked:false, currentBookmarkid: data.id})).then(this.props.changeState)
  }

  checkBookmark = () => {
    return (this.state.bookmarked ? <Button onClick={this.onUnBookmark} variant="contained" color="secondary">UnBookmark</Button> : <Button onClick={this.onBookmark} variant="contained" color="primary">Bookmark</Button>)
  }

  render(){
    return(
      <div>
        {this.checkBookmark()}
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


export default connect(mapStateToProps, mapDispatchToProps)(BookmarkButton)
