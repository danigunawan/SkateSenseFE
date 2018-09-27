import React, { Component } from 'react'

class SkateSpotItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      image: require(`../../assets/hollywood16.png`)
    }
  }

  componentDidMount(){
    this.setState({image: this.props.spot.photo})
  }

    render(){
      return(
        <div>
          <center>
            <h2>{this.props.spot.name}</h2>
            <h3>{this.props.spot.bust_factor}</h3><br/>
            <h3>{this.props.spot.description}</h3>
          </center>
        </div>
      )
    }
}

export default SkateSpotItem
