import { csrfFetch } from "./csrf";

const ADD_BOOKING_TO_SPOT = 'spots/addBookingToSpot'
const LOAD_ALL_SPOT_BOOKINGS = 'spots/loadAllBookingsOfSpot'
const LOAD_CURRENT_USER_BOOKINGS = 'bookings/loadcurrentBookings'
const DELETE_BOOKING = 'bookings/deleteBooking'

export const addBookingToSpot = (booking) => {
    return {
        type: ADD_BOOKING_TO_SPOT,
        booking
    };
};

export const loadBookingsOfSpot = (bookings) => {
    return {
        type: LOAD_ALL_SPOT_BOOKINGS,
        bookings
    }
}

export const loadCurrentUserBookings = (bookings) => {
    return {
        type: LOAD_CURRENT_USER_BOOKINGS,
        bookings
    };
}

export const deleteOneBooking = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    };
};

export const thunkAddBookingToSpot = (data) => async dispatch => {
    const { id, startDate, endDate } = data
    // console.log('!!!!!!data', data)
    // console.log("days!!!", `${(new Date(endDate).getTime() - new Date(startDate).getTime())/ (1000 * 3600 * 24)}` )
    const response = await csrfFetch(`/api/spots/${id}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate }),
    })
    // console.log('!!!!!!response', response)
    if (response.ok) {
        const booking = await response.json();
        dispatch(addBookingToSpot(booking))
        // console.log('booking!!!!!!', booking)
        return booking
    }
}

export const thunkLoadBookingsOfSpot = (id) => async (dispatch) => {

    const response = await fetch(`/api/spots/${id}/bookings`)
    if (response.ok) {
        const bookings = await response.json();
        // console.log("!!!!!!!!reviews", reviews)
        dispatch(loadBookingsOfSpot(bookings))
        return bookings
    }
}

export const thunkGetAllCurrentUserBookings = () => async (dispatch) => {
    const response = await fetch(`/api/bookings/current`)
    if (response.ok) {
        const bookings = await response.json();
        // console.log("!!!!!!!!bookings",bookings)
        dispatch(loadCurrentUserBookings(bookings))
        return bookings
    }
}

export const thunkDeleteBooking = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
        const booking = await response.json();
        dispatch(deleteOneBooking(id));
    }
}

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {

        case LOAD_ALL_SPOT_BOOKINGS:
            const allBookings = {};
            // console.log("action!!!!!!!!", action)
            action.bookings.bookings.forEach(booking => {
                allBookings[booking.id] = booking
            });
            // console.log("allBookings!!!!!!!!", allBookings)
            return { ...allBookings };

        case ADD_BOOKING_TO_SPOT:
            // console.log('!!!action', action)
            return { ...state, [action.booking.id]: { ...action.booking } };

        case LOAD_CURRENT_USER_BOOKINGS:
            // console.log("action!!!!!!!!", action.spot)
            let curretUserState = {}
            // console.log("!!!!!!!!action", action.bookings.Bookings)
            action.bookings.Bookings.forEach(booking => {
                curretUserState[booking.id] = booking
            });
            // console.log("!!!!!!!!curretUserState", curretUserState)
            return curretUserState

        case DELETE_BOOKING:
            let newState = { ...state }
            // console.log('!!!action', action)
            delete newState[action.id]
            return newState

        default:
            return state;
    }
}

export default bookingsReducer;
// import { csrfFetch } from "./csrf";

// const GET_ALL_BOOKINGS_FOR_SPOT_BY_ID = "bookings/getAllBookingsForASpot";
// const GET_ALL_BOOKINGS_FOR_CURRENT_USER = "bookings/getAllBookingsForCurrentUser";
// const CREATE_BOOKING = "bookings/createBooking";
// const UPDATE_BOOKING = "bookings/updateBooking";
// const DELETE_BOOKING = "booking/deleteBooking";
// const LOG_OUT_BOOKINGS = "bookings/logoutBookings";

// export const getAllBookingsForSpotIdAction = (bookings) => {
//   return {
//     type: GET_ALL_BOOKINGS_FOR_SPOT_BY_ID,
//     bookings,
//   };
// };
// export const getAllBookingsForCurrentUserAction = (bookings) => {
//   return {
//     type: GET_ALL_BOOKINGS_FOR_CURRENT_USER,
//     bookings,
//   };
// };
// export const createBookingAction = (booking) => {
//   return {
//     type: CREATE_BOOKING,
//     booking,
//   };
// };
// export const updateBookingAction = (booking) => {
//   return {
//     type: CREATE_BOOKING,
//     booking,
//   };
// };
// export const deleteBookingAction = (id) => {
//   return {
//     type: DELETE_BOOKING,
//     id,
//   };
// };
// export const logoutBookingsAction = () => {
//   return {
//     type: LOG_OUT_BOOKINGS,
//   };
// };

// export const getAllBookingsForSpotIdThunk = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/bookings/auth/${spotId}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) {
//     const bookings = await response.json();
//     dispatch(getAllBookingsForSpotIdAction(bookings));
//     return bookings;
//   }
//   const errors = await response.json();
//   return errors;
// };
// export const getAllBookingsForCurrentUserThunk = () => async (dispatch) => {
//   const response = await csrfFetch("/api/bookings/auth", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) {
//     const bookings = await response.json();
//     dispatch(getAllBookingsForCurrentUserAction(bookings));
//     return bookings;
//   }
//   const errors = await response.json();
//   return errors;
// };
// export const createBookingThunk = (spotId, booking) => async (dispatch) => {
//   const response = await csrfFetch(`/api/bookings/auth/${spotId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(booking),
//   });
//   if (response.ok) {
//     const createdBooking = await response.json();
//     dispatch(createBookingAction(createdBooking));
//     return createdBooking;
//   }
//   return response;
// };
// export const updateBookingThunk = (bookingId, booking) => async (dispatch) => {
//   const response = await csrfFetch(`/api/bookings/auth/${bookingId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(booking),
//   });
//   if (response.ok) {
//     const updatedBooking = await response.json();
//     dispatch(updateBookingAction(booking));
//     return updatedBooking;
//   }
//   return response;
// };
// export const deleteBookingThunk = (bookingId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/bookings/auth/${bookingId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) {
//     const message = await response.json();
//     dispatch(deleteBookingAction(bookingId));
//     return message;
//   }
//   return response;
// };

// export const logoutBookingsThunk = () => async (dispatch) => {
//   dispatch(logoutBookingsAction());
// };


// const bookingsReducer = (state = null, action) => {
//   switch (action.type) {
//     case GET_ALL_BOOKINGS_FOR_SPOT_BY_ID: {
//       const newState = {};
//       if (action.bookings.Bookings) {
//         console.log("action", action);
//         const bookingsArr = action.bookings.Bookings;
//         bookingsArr.forEach((booking) => {
//           newState[booking.id] = booking;
//         });
//         newState.orderedBookingList = [...bookingsArr];
//         return newState;
//       } else {
//         newState.orderedBookingList = [];
//         return newState;
//       }
//     }
//     case GET_ALL_BOOKINGS_FOR_CURRENT_USER: {
//       const newState = { ...state };
//       // action has type and bookings: {Bookings: Array(5)}
//       //so we need to key into action at bookings.Bookings to get the array
//       //check api route for booking line 102
//       const bookingsArr = action.bookings.Bookings;
//       bookingsArr.forEach((booking) => {
//         newState[booking.id] = booking;
//       });
//       newState.orderedBookingList = [...bookingsArr];
//       return newState;
//     }
//     case DELETE_BOOKING: {
//       const newState = { ...state };
//       delete newState[action.id];
//       newState.orderedBookingList = [...state.orderedBookingList];
//       return newState;
//     }

//     case CREATE_BOOKING:
//     case UPDATE_BOOKING: {
//       const newState = { ...state };
//       newState[action.booking.id] = action.booking;
//       return newState;
//     }
//     case LOG_OUT_BOOKINGS: {
//       const newState = null;
//       return newState;
//     }
//     default:
//       return state;
//   }
// };

// export default bookingsReducer;
