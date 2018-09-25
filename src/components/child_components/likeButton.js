import React, {Component} from 'react'
import Button from '@material-ui/core/Button';



class LikeButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      like: false
    }
  }

  onLike = () => {
    this.setState({like:true})
    console.log('LIKED!')
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
    console.log(this.state.like);
    return(
      this.checkLike()
    )
  }
}

export default LikeButton;
