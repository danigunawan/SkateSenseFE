import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { getUserData } from '../../action'
import { connect } from 'react-redux'
import { getSkateSpots } from '../../action'


class LikeButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      like: false,
      markerID: this.props.marker.id,
      currentUserid: this.props.marker.currentUserid,
      currentLikeid: 'empty'
    }
  }

  componentDidMount(){
    this.props.getUserData()
    .then(() => {
      this.checkIfUserLikedPost()
    })
  }

  checkIfUserLikedPost = () =>{
    let data = this.props.userData ? this.props.userData.likes : null
    if (data !== null){
      const liked = data.find(likes=>(likes.skate_spot_id === this.state.markerID))
      liked ? this.setState({like:true, currentLikeid:liked.id}) : null
    }
  }


  onLike = () => {
    fetch('http://localhost:3000/api/v1/likes',{
      method: "POST",
      body: JSON.stringify({
        skate_spot_id:`${this.state.markerID}`,
        user_id: `${this.state.currentUserid}`
      }),
      headers: {
        'Content-Type': 'application/json'}
    }).then(r=>r.json()).then(data=>this.setState({like: true, currentLikeid: data.id})).then(this.props.getSkateSpots())
  }

  onUnLike = () => {
    fetch(`http://localhost:3000/api/v1/likes/${this.state.currentLikeid}`,{
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'}
    }).then(r=>r.json()).then(data=>this.setState({like:false, currentLikeid: data.id})).then(this.props.getSkateSpots())
  }

  checkLike = () => {
    return (this.state.like ? <Button onClick={this.onUnLike} variant="contained" color="secondary">Unlike</Button> : <Button onClick={this.onLike} variant="contained" color="primary">Like</Button>)
  }

  render(){
    return(
      <div>
        {this.checkLike()}
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
      getSkateSpots: () => dispatch(getSkateSpots())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)
