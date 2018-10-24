export function getUsers() {
    return (dispatch) =>{
      return fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/users`).then(r=>r.json()).then(data=>dispatch({type:'GET_USERS', payload:data}))
    }
}

export const createUser = (username, password, first_name, last_name, email, photo) => {

  let objData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      user: {
        username: username,
        password: password,
        first_name: first_name,
        last_name: last_name,
        email: email,
        photo: photo
      }
    })
  }

  return(dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER'})
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/users`, objData)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw response
      }
    })
      .then(JSONResponse => {
        console.log(JSONResponse);
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      // .catch( res => {res.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message }))})
      .catch( res => console.log('res ',res))
    }
}

export const loginUser = (username, password) => {

  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER'})
    fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw response
        }
      })
      .then(JSONResponse => {
        localStorage.setItem('jwt', JSONResponse.jwt)
        dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user })
      })
      .catch( res => {
        res.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message }))})
    }
}

export const fetchCurrentUser = () => {

  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch(`${process.env.REACT_APP_BACKEND_IP}/api/v1/profile`, {
      method: 'GET',
      headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
    })
      .then(response => response.json())
      .then((JSONResponse) => dispatch(setCurrentUser(JSONResponse.user)))
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})

export const logoutUser = (dispatch) => {
  dispatch({type:'LOGOUT_USER'})
}

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' })


export function getSkateSpots() {
    return (dispatch) =>{
      return fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/skate_spots`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(r=>r.json())
      .then(data=>dispatch({type:'GET_SKATE_SPOTS', payload:data}))
    }
}

export function getUserData() {
    return (dispatch) =>{
      dispatch({type: 'LOADING_DATA'})
      return fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/users/1`, {
        method:'GET',
        headers:{
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      })
        .then(r=>r.json()).then(data=>{
        dispatch({type:'GET_USER_DATA', payload:data})
        dispatch({type:'LOADED_DATA'})
        return data
      })
    }
}

export function getGeolocation() {
  return (dispatch) => {
    console.log('got here line 27 action.js');
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log('got here line 29 action.js');
      let data = {latitude: position.coords.latitude, longitude:position.coords.longitude}
      console.log('got here line 31 action.js');
      console.log(data)
      dispatch({type: 'GET_USER_GEOLOCATION', payload:data})
      return data
    })
  }
}

export function logSearchTerm(e) {
  return (dispatch) =>{
    dispatch({type: 'LOG_SEARCH_TERM', payload:e.target.value})
    return e.target.value
  }
}


export function postSkateSpots() {
    return (dispatch) =>{
      return fetch(`http://${process.env.REACT_APP_BACKEND_IP}/api/v1/skate_spots`,{
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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }).then(r=>r.json()).then(data=>dispatch(getSkateSpots()))
    }
}
