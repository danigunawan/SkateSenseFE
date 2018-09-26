import React, { Component } from 'react'
import Button from '@material-ui/core/Button';

class BookmarkButton extends Component{
  constructor(props){
    super(props)
    this.state = {
      bookmarked: false
    }
  }

  onBookmark = () => {
    this.setState({bookmarked:true})
    console.log('BOOKMARKED!')
    // fetch('http://localhost:3000/api/v1/bookmarks',{
    //   method: "POST",
    //   body: JSON.stringify({
    //     skate_spot_id:1,
    //     user_id: 1
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'}
    // }).then(r=>r.json()).then(data=>console.log(data))
  }

  onUnBookmark = () => {
    this.setState({bookmarked:false})
    console.log('UNBOOKMARKED!')
    // fetch('http://localhost:3000/api/v1/bookmarks',{
    //   method: "POST",
    //   body: JSON.stringify({
    //     skate_spot_id:1,
    //     user_id: 1
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'}
    // }).then(r=>r.json()).then(data=>console.log(data))
  }

  checkBookmark = () => {
    return (this.state.bookmarked ? <Button onClick={this.onUnBookmark} variant="contained" color="secondary">UnBookmark</Button> : <Button onClick={this.onBookmark} variant="contained" color="primary">Bookmark</Button>)
  }

  render(){
    console.log(this.state.bookmarked);
    return(
      this.checkBookmark()
    )
  }

}

export default BookmarkButton;
