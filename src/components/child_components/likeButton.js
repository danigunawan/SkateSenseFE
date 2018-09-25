import React from 'react'
import Button from '@material-ui/core/Button';

function onLike() {
  console.log('LIKE!')
}

const LikeButton = () =>{
    return <Button onClick={onLike} variant="contained" color="primary">Like</Button>
}

export default LikeButton;
