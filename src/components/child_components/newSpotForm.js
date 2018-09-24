import React, { Component } from 'react'

export default class newSpotForm extends Component {
  constructor(props){
    super(props)
    this.state={
      SpotName: '',
      BustFactor: '',
      Photo: ''
    }
  }

  changeEverything = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) =>{
    e.preventDefault()
    console.log('got here!');
  }

  render(){
    console.log(this.state);
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
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}
