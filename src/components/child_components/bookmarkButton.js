import React from 'react'
import Button from '@material-ui/core/Button';

function onBookmark() {
  console.log('BOOKMARKED')
  fetch('http://localhost:3000/api/v1/bookmarks',{
    method: "POST",
    body: JSON.stringify({
      skate_spot_id:1,
      user_id: 1
    }),
    headers: {
      'Content-Type': 'application/json'}
  }).then(r=>r.json()).then(data=>console.log(data))
}

const BookmarkButton = () => {
    return <Button onClick={onBookmark} variant="contained" color="primary">Bookmark</Button>
}

export default BookmarkButton;
