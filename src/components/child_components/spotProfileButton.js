import React from 'react'
import Button from '@material-ui/core/Button';
import SkateSpotContainer from '../containers/SkateSpotContainer'



function onSkateSpotPageClick() {
    console.log('Hit the spot page!')
}

const SkateSpotPageButton = () => {
    return <Button href="/spot" onClick={onSkateSpotPageClick} variant="contained" color="primary">Spot Page</Button>
}

export default SkateSpotPageButton;
