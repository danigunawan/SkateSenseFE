import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSkateSpots } from '../../action'
import FlatButton from '@material-ui/core/Button';
import Input from 'react'

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
    console.log(this.state);
  }

  handleFileUpload = (e) => {
  this.setState({
    Photo: e.target.files[0],
  })
  // debugger
  // console.log(e.target.files);
};

  onSubmit = (e) =>{
    e.preventDefault()
    let data = new FormData()
        data.append('name', this.state.SpotName)
        data.append('country', 'n/a')
        data.append('city', 'n/a')
        data.append('state', 'n/a')
        data.append('latitude', this.props.latitude)
        data.append('longitude', this.props.longitude)
        data.append('description', this.state.Description)
        data.append('bust_factor', this.state.BustValue)
        data.append('skatephoto', this.state.Photo)
        data.append('user_id', 1)

      fetch(`http://localhost:3000/api/v1/skate_spots`, {
        method: 'POST',
        body: data,
        }
      ).then(r=>r.json()).then(data=>console.log(data))
  }

  render(){
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
          <input name="Photo" onChange={this.handleFileUpload} type="file" /><br/>
          Description:
          <textarea  name="Description" value={this.state.Description} onChange={this.changeEverything} type="text" /><br/>

          <FlatButton type="submit" variant="contained" color="primary">Submit</FlatButton>
        </form>
      </div>
    )
  }
}


export default connect()(newSpotForm)

// fetch('http://localhost:3000/api/v1/skate_spots',{
//   method: "POST",
//   body: JSON.stringify({
//     name: this.state.SpotName,
//     country: 'n/a',
//     city: 'n/a',
//     state: 'n/a',
//     latitude: this.props.latitude,
//     longitude: this.props.longitude,
//     description: this.state.Description,
//     bust_factor: this.state.BustValue,
//     photo: 'NYC_Black_Hubba',
//     user_id: 1
//   }),
//   headers: {
//     'Content-Type': 'application/json'}
// }).then(r=>r.json()).then(data=>this.props.dispatch(getSkateSpots()))
