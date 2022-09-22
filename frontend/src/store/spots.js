import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";
const READ_ONE_SPOT = "spots/READ_ONE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"

export const allSpotsArray = (state) => Object.values(state.spots);
export const allSpotsObj = state => state.spots
//action creator
//get all spots
const readAllSpots = (spots) => {
    return {
        type: READ_ALL_SPOTS,
        spots,
    }
}

//get one spot
const readOneSpot = (spot) => {
    return {
        type: READ_ONE_SPOT,
        spot,
    }
}

//create action
const createSpot = (spots) => {
    return {
        type: CREATE_SPOT,
        spots,
    }
}


//update action
const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot,
    }
}

//delete action
const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot,
    }
}

//thunks
//get all spots thunk
export const getAllSpots = () => async(dispatch) => {
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const spots = await res.json()
        dispatch(readAllSpots(spots.Spots))
    }

}

//get one spot thunk

export const getOneSpot = (spotId) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`)

    if(res.ok){
        const spot = await res.json()
        dispatch(readOneSpot(spot))
    }
}

//add a spot thunk

export const addSpot = (spots) => async(dispatch) => {
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spots)
    })
    if(res.ok) {
        const spot = await res.json()
        dispatch(createSpot(spot))
        return spot
    }
}

//update spot thunk

// export const editSpot = (spot) => async(dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spot?.id}`, {
//         method: 'PUT',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(spot)
//     })
//     if(res.ok) {
//         const spot = await res.json();
//         dispatch(updateSpot(spot))
//     }
// }


export const editSpot = (spotInfo, spotId) => async(dispatch) =>{

        const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spotInfo)
        });

        if (res.ok) {

        const newSpot = await res.json();
        dispatch(updateSpot(newSpot));
        return newSpot
        }
}

//delete spot thunk
export const removeSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      //const spot = await response.json();
      dispatch(deleteSpot(spotId));
      //spot or spotId
    }
    return res
  };

  export const createImage = (imageUrl, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(imageUrl)
    })
    if (res.ok) {
      dispatch(getOneSpot(spotId))
    }
    return res;
  }

  //reducer
const initialState = {
    // allSpots: {},
    // singleSpot: {SpotImages: []}
}
const spotReducer = (state = initialState, action) => {
    let newState={}
    switch(action.type) {
        case READ_ALL_SPOTS:
            // newState = { ...state, allSpots: { ...action.spots } }
            // return newState
            const allSpots = {}
            action.spots.forEach(spot => {
              allSpots[spot.id] = spot
            })
            newState = {...state, ...allSpots}
            return newState;
        case READ_ONE_SPOT:
            newState = { ...state };
            newState[action.spot.id] = action.spot;
            return newState;

        case CREATE_SPOT:
            newState = {...state}
            newState[action.spots.id] = action.spots
            return newState
        case UPDATE_SPOT:
            newState = {...state}
            //quick fix is not using siglespot
            newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
            return newState
        case DELETE_SPOT:
            newState = {...state}
            delete newState[action.spotId]
            return newState
        default:
            return state

    }
}


export default spotReducer
