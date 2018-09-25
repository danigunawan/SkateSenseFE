import React from 'react'
import Button from '@material-ui/core/Button';

function onBookmark() {
  console.log('BOOKMARKED');
}

const BookmarkButton = () => {
    return <Button onClick={onBookmark} variant="contained" color="primary">Bookmark</Button>
}

export default BookmarkButton;
