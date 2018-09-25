export function getUsers() {
    return (dispatch) =>{
      return fetch('http://localhost:3000/api/v1/users').then(r=>r.json()).then(data=>dispatch({type:'GET_USERS', payload:data}))
    }
}

export function getSkateSpots() {
    return (dispatch) =>{
      return fetch('http://localhost:3000/api/v1/skate_spots').then(r=>r.json()).then(data=>dispatch({type:'GET_SKATE_SPOTS', payload:data}))
    }
}
