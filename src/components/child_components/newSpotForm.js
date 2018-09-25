import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSkateSpots } from '../../action'

class newSpotForm extends Component {
  constructor(props){
    super(props)
    this.state={
      SpotName: '',
      BustFactor: '',
      Photo: '',
      Description: ''
    }
  }

  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) =>{
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/skate_spots',{
      method: "POST",
      body: JSON.stringify({
        name: this.state.SpotName,
        country: 'n/a',
        city: 'n/a',
        state: 'n/a',
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        description: this.state.Description,
        bust_factor: this.state.BustValue,
        photo: 'NYC_Black_Hubba',
        user_id: 1
      }),
      headers: {
        'Content-Type': 'application/json'}
    }).then(r=>r.json()).then(data=>this.props.dispatch(getSkateSpots()))
  }

  render(){
    console.log('hello', this.props);
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          Name: <input name="SpotName" value={this.state.SpotName} type="text" onChange={this.changeEverything}/><br/>
          Bust Factor:
          <select name="BustFactor" value={this.state.BustFactor} onChange={this.changeEverything}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select><br/>
          Photo:
          <input  name="Photo" value={this.state.Photo} onChange={this.changeEverything} type="file" /><br/>
          Description:
          <textarea  name="Description" value={this.state.Description} onChange={this.changeEverything} type="text" /><br/>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

// const mapDispatchToProps = dispatch =>{
//
//
// }

export default connect()(newSpotForm)
