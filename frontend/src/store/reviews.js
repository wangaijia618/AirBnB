import { csrfFetch } from './csrf';


// type:
const LOAD_ALL_SPOT_REVIEWS = "reviews/LOAD_ALL_SPOT_REVIEWS"
const LOAD_ALL_USER_REVIEWS = "reviews/LOAD_ALL_USER_REVIEWS"
const ADD_REVIEW = "reviews/ADD_REVIEW"
const DELETE_REVIEW = "reviews/DELETE_REVIEW";
const EDIT_REVIEW = "reviews/EDIT_REVIEW"
const UPDATE_REVIEWS_DELETE = 'reviews/updateReviewsAfterDelete'
export const allReviewsArray = (state) => Object.values(state.reviews);
export const allReviewsObj = state => state.reviews;

//action creator:
const loadAllSpotReview = (reviews) => ({
    type: LOAD_ALL_SPOT_REVIEWS,
    reviews
});

const loadAllUserReview = (reviews) => ({
    type: LOAD_ALL_USER_REVIEWS,
    reviews
});

const addReview = (review) => ({
    type: ADD_REVIEW,
    review
});


const goodbyeReview = (id) => ({
  type: DELETE_REVIEW,
  id
});

const updateReviewsAfterDelete = (payload) => {
  return {
      type: UPDATE_REVIEWS_DELETE,
      payload,
  }
}

//thunk:
// get all spot review thunk
export const getSpotReview = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    // console.log("response: ", response)

    if (response.ok) {
        const reviews = await response.json()
        // console.log("reviews from thunk: ", reviews)
        dispatch(loadAllSpotReview(reviews.Reviews))
    }
}
export const updateUserReviews = (id) => async dispatch => {
  const response = await csrfFetch(`/api/users/${id}/reviews`);
  const data = await response.json();
  dispatch(updateReviewsAfterDelete(data.Reviews));
  return response;
};

// get all user review thunk
export const getUserReview = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)


    if (response.ok) {
        const reviews = await response.json()
        // console.log("reviews from thunk: ", reviews)
        dispatch(loadAllUserReview(reviews.Reviews))

    }
}


// create a review for spot

export const createReview = (myReviewInfo, spotId, user) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myReviewInfo)
    });
    //  console.log("############response: ", res)

    if (res.ok) {
      const review = await res.json();
      review.User = {id: user.user.id, firstName: user.user.firstName, lastName: user.user.lastName}
      dispatch(addReview(review));
      // console.log("spot: ", spot)
    // return review
    }
  };

// delete reducer
  export const deleteReview = (id) => async (dispatch) => {
    console.log("id from thunk delete: ", id)
    const response = await csrfFetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(mySpot)
    });
    // console.log("Delete response from thunk: ", response)

    if (response.ok) {
      const review = await response.json();
      dispatch(goodbyeReview(id));
      // console.log("Delete spot from thunk: ", review)
    }
  };

  export const editReview = (reviewId, updatedReview) => async (dispatch) => {
    const { review, stars } = updatedReview;
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "PUT",
        body: JSON.stringify({
            review,
            stars
        }),
    });
    const data = await response.json();
    dispatch(createReview(data));
    return response;
};


//reducer:

const initialState = {}
const reviewReducer = (state = initialState, action) =>{
      let newState = {};
      switch (action.type) {
        case LOAD_ALL_SPOT_REVIEWS:

            //   console.log("action.review: ", action.review)
                action.reviews.forEach(review => {
                newState[review.id] = review
              })
            //  newState = {...newState}
              return newState
        case LOAD_ALL_USER_REVIEWS:
             newState = {}
            //   console.log("action.spots: ", action.spots)
                action.reviews.forEach(review => {
                newState[review.id] = review
              })
            //  newState = {...newState}
                  return newState
        case ADD_REVIEW :
                newState = {...state}
                  // console.log("action.review  ", action.review)
                newState[action.review.id] = action.review
                  // console.log("newState from review reducer after ", newState)
                return newState

        case DELETE_REVIEW :
            newState = {...state}
              // console.log("action.review  ", action.review)
              delete newState[action.id]
              // console.log("newState from review reducer after ", newState)
            return newState

        case UPDATE_REVIEWS_DELETE:
            newState = Object.assign({});
            action.payload.map(review => newState[review.id] = review);
            return newState;
          default:
            return state
      }
    };

        export default reviewReducer
