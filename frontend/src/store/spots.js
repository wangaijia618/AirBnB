import { csrfFetch } from './csrf';

const READ_ALL_SPOTS = "spots/READ_ALL_SPOTS";
const READ_ONE_SPOT = "spots/READ_ONE_SPOT";
const CREATE_SPOT = "spots/CREATE_SPOT";
const UPDATE_SPOT = "spots/UPDATE_SPOT"
const DELETE_SPOT = "spots/DELETE_SPOT"
const READ_OWNER_SPOTS = "spots/READ_OWNER_SPOTS";
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

//get current owner spot
const readOwnerSpots = (spots) => {
    return {
        type: READ_OWNER_SPOTS,
        spots,
    }
};

//update action
const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot,
    }
}

//delete action
const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId,
    }
}

//thunks
//get all spots thunk
export const getAllSpots = () => async(dispatch) => {
    const res = await csrfFetch('/api/spots')
    if(res.ok){
        const spots = await res.json()
         //dispatch(readAllSpots(spots))
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

//GET ALL SPOTS BY CURRENT USER
export const allSpotsUser = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    if (res.ok) {
      const spots = await res.json();

      dispatch(readOwnerSpots(spots.Spots));
    };
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
    //   headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {

      dispatch(deleteSpot(spotId));

    }
  };

  export const createImage = (spotId, {preview, url}) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({preview, url})
    })
    if(response.ok){

        dispatch(getOneSpot(spotId))
        return response;
    }
    return response
}

  //reducer
const initialState = {
    allSpots: {},
    singleSpot: {}
}
// const spotReducer = (state = initialState, action) => {
//     let newState={}
//     switch(action.type) {
//         case READ_ALL_SPOTS:
//             // newState = { ...state, allSpots: { ...action.spots } }
//             // return newState
//             const allSpots = {}
//             action.spots.forEach(spot => {
//               allSpots[spot.id] = spot
//             })
//             newState = {...state, ...allSpots}
//             return newState;
//         case READ_ONE_SPOT:
//             newState = { ...state };
//             newState[action.spot.id] = action.spot;
//             return newState;

//         case CREATE_SPOT:
//             newState = {...state}
//             newState[action.spots.id] = action.spots
//             return newState
//         case UPDATE_SPOT:
//             newState = {...state}
//             //quick fix is not using siglespot
//             newState[action.spot.id] = {...newState[action.spot.id], ...action.spot}
//             return newState
//         case DELETE_SPOT:
//             newState = {...state}
//             delete newState[action.spotId]
//             return newState
//         case READ_OWNER_SPOTS:
//                   newState = {}
//                //   console.log("action.spots: ", action.spots)
//                 action.spots.forEach(spot => {
//                 newState[spot.id] = spot
//                  })
//                //  newState = {...newState}
//                 return newState
//         default:
//             return state

//     }
// }
const spotReducer = (state = initialState, action) => {
    switch(action.type){
        case READ_ALL_SPOTS:
            const newState = {...state};
            const newAllSpots = {}
            //console.log('action.list!!!!!!!!!!!', action.list)
            // action.list.Spots.forEach((spot) => {newAllSpots[spot.id] = spot})
            action.spots.forEach((spot) => {newAllSpots[spot.id] = spot})
            newState.allSpots = newAllSpots
            return newState;

        case READ_ONE_SPOT:
            const newState1 = {...state}
            newState1.singleSpot= action.spot
            return newState1

        case CREATE_SPOT:
            // const newState2 = {...state, allSpots: {...state.allSpots, [action.spot.id]: action.spot}}
            // return newState2
            let newState2={...state}
            newState2.allSpots = {...state.allSpots, [action.spot.id]: action.spot}
            //newState2.singleSpot={...state.singleSpot, ...action.spot}
            return newState2

        case UPDATE_SPOT:
            const newState3 = {...state}
            newState3.allSpots={...state.allSpots, [action.spot.id]: action.spot}
            newState3.singleSpot={...state.singleSpot, ...action.spot}

            return newState3

        case DELETE_SPOT:
            const newState4 = {...state}
            delete newState4.allSpots[action.spotId]
            if(newState4.singleSpot.id === action.spotId) newState4.singleSpot={}
            return newState4
        // case READ_OWNER_SPOTS:
        //     newState = { ...state };
        //     const normalizedUserSpots = action.spots.Spots.reduce((obj, curSpot) => {
        //         obj[curSpot.id] = curSpot;
        //         return obj;
        //         }, {});
        //     newState.allSpots = normalizedUserSpots;
        //     return newState;
        default:
            return state
    }
}
export default spotReducer
