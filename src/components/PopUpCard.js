import React from 'react'
import { Card } from 'semantic-ui-react';

class PartyCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: false
    }
  }

  submitHandler = (event) => {
    event.preventDefault()
    const lat = this.props.latlng.lat.toString()
    const lng = this.props.latlng.lng.toString()
    const latlng = lat + ", " + lng
    const dataObj = {
      address: document.getElementById("address").value,
      host_id: document.getElementById("host-id").value,
      description: document.getElementById("description").value,
      address: document.getElementById("address").value,
      latlng: latlng
    }
    this.props.handlePost(dataObj)
  }

  handleClick = e => {
    e.preventDefault();
    this.setState({ isClicked: !this.state.isClicked });
  }

  render() {
    return (
      <Card>
        Create A New Party!!
        <br />
        <form onSubmit={this.submitHandler} latlng={this.props.latlng}>
          <input id="address" type='text' placeholder="Address" />
          <input id="description" type='text' placeholder="Description" />
          <input id="host-id" type='number' placeholder="Host Id" />
          <br />
          <button className="ui button" >
            CREATE AN EVENT!
          </button>
        </form>
      </Card>
    )
  }
}


// <Card
//   image='/images/avatar/large/elliot.jpg'
//   header='PARTY TIME'
//   meta='Friend'
//   description="Hello"
//   />
export default PartyCard
