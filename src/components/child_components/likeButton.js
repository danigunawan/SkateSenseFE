import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { getUserData } from '../../action'
import { connect } from 'react-redux'

class LikeButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      like: false,
      markerID: this.props.marker.id,
      currentUserid: this.props.marker.currentUserid
    }
  }

  componentDidMount(){
    this.props.getUserData()
  }

  checkIfUserLikedPost = () =>{
    let data = this.props.userData ? this.props.userData.likes : null
    if (data != null){
      data.map(likes=>{
        if (likes.skate_spot_id === this.state.markerID){
          console.log('hello');
        }
      })
    }
  }


  onLike = () => {
    this.setState({like:true})
    console.log('LIKED!');
    // fetch('http://localhost:3000/api/v1/likes',{
    //   method: "POST",
    //   body: JSON.stringify({
    //     skate_spot_id:`${this.state.markerID}`,
    //     user_id: `${this.state.currentUserid}`
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'}
    // }).then(r=>r.json()).then(data=>console.log(data))
  }

  onUnLike = () => {
    this.setState({like:false})
    console.log('UNLIKED!')
    // fetch('http://localhost:3000/api/v1/likes',{
    //   method: "POST",
    //   body: JSON.stringify({
    //     skate_spot_id:1,
    //     user_id: 1
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'}
    // }).then(r=>r.json()).then(data=>console.log(data))
  }

  checkLike = () => {
    return (this.state.like ? <Button onClick={this.onUnLike} variant="contained" color="secondary">Unlike</Button> : <Button onClick={this.onLike} variant="contained" color="primary">Like</Button>)
  }

  render(){
    console.log('got here!');
    this.checkIfUserLikedPost()
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)
