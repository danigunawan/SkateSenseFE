import React from 'react'
import Button from '@material-ui/core/Button';


function onSkateSpotPageClick() {
    console.log('Hit the spot page!')
}

const SkateSpotPageButton = () => {
    return <Button onClick={onSkateSpotPageClick} variant="contained" color="primary">Spot Profile</Button>
}

export default SkateSpotPageButton;
