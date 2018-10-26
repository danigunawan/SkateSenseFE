import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { fetchCurrentUser } from '../../action'
import { connect } from 'react-redux'
import { compose } from 'redux'



class BookmarkButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      bookmarked: false,
      markerID: this.props.marker.id,
      // currentUserid: this.props.marker.currentUserid,
      currentUserid: this.props.currentUser.user.id,
      currentBookmarkid: 'empty'
    }
  }


  componentDidMount(){
      this.checkIfUserBookmarkedPost()
  }

  checkIfUserBookmarkedPost = () =>{
    let data = this.props.userData ? this.props.userData.bookmarks : null
    if (data !== null){
      const bookmarked = data.find(bookmarks=>(bookmarks.skate_spot_id === this.state.markerID))
      bookmarked ? this.setState({bookmarked:true, currentBookmarkid:bookmarked.id}) : null
    }
  }


  // fetch(`http://localhost:3000/api/v1/bookmarks/`,{
  //         method: 'POST',
  //         mode: "cors",
  //         body: JSON.stringify({
  //           skate_spot_id:210,
  //           user_id:15
  //         }),
  //         headers: {
  //            "Content-Type": "application/json; charset=utf-8",
  //           'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNX0.i3ce1vrr43FJ1ox7M0lftvHk_nfGKbxtM-jZ_h8z1Ww'
  //         }
  //       })
  //       .then(res => res.json())
  //       .then(response => console.log('Success:', JSON.stringify(response)))
  //       .catch(error => console.error('Error:', error));
  
  onBookmark = () => {
    console.log(' line 36 props', this.state.currentUserid)
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/bookmarks`,{
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        skate_spot_id:`${this.state.markerID}`,
        user_id: `${this.state.currentUserid}`
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    }).then(r=>r.json()).then(data=>this.setState({bookmarked: true, currentBookmarkid: data.id}))
  }

  onUnBookmark = () => {
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/bookmarks/${this.state.currentBookmarkid}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
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
    loadingData: state.loadingData,
    currentUser: state.user
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser)
    }
}



const connectMap = connect(mapStateToProps, mapDispatchToProps)
export default compose(connectMap)(BookmarkButton)
