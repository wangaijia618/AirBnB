import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {getOneSpot, allSpotsArray, allSpotsObj, removeSpot, editSpot} from '../../store/spots';
import {allReviewsArray, getSpotReview} from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';
import aircover from '../../images/airdnd-aircover.png'
import UserReviewNoEdit from '../UserReview/UserReviewNoEdit.js';
import "./FindSpot.css";
import EditSpotModal from "../EditSpotForm";
import CreateBooking from "../Booking/CreateBooking";
// replaced {spot?countReviews} with {reviewsObj?.length} to update review immidiately
import CheckBooking from "../Booking/CheckBooking";
const FindSpot = () => {
  let currentUser;
  let {spotId} = useParams();
  spotId = parseInt(spotId)
  const dispatch = useDispatch();
  const history = useHistory();
// export const allSpotsObj = state => state.spots
  const spot = useSelector(state => state.spots.singleSpot);
  // export const allReviewsArray = (state) => Object.values(state.reviews);
  const reviewsObj = useSelector(allReviewsArray);
  //  const reviews = useSelector(state => state.reviews.spot)
  // const reviewContent = Object.values(reviews)
  // const reviewsObj = useSelector(state => state.reviews.spot)
  const [isLoaded, setIsLoaded] = useState(false)
  //in use
    // const spot = spotsObj[+spotId]; //or using Number(spotId)
    // const spot = useSelector(state => state.spots)
  //  console.log(~~~~~~~~~~spotId)
  //   console.log(~~~~~~~~~~~~~~spot)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getOneSpot(+spotId))
    dispatch(getSpotReview(+spotId))
    .then(() => setIsLoaded(true))
  }, [dispatch, +spotId, reviewsObj.length])

  const handleDelete = async (e) => {
  e.preventDefault();
  await dispatch(removeSpot(+spotId))
  history.push("/")
}

if (sessionUser && spot) {
  if (sessionUser.id === spot.ownerId) {
    currentUser = true;
  } else currentUser = false;
}
console.log("????????????", spot)
// if(!spot.SpotImages) return null
// if (Object.keys(spot).length === 0) return null
return (
<>
    {isLoaded && (
      <div className='spot_body_container'>
     <div className='single_spot_infos'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='rating_top_spot'>
            <div className='outsideStar'>
           <i className="fa-solid fa-star"/>
           {/* <div>{spot?.avgStarRating} · {spot?.countReviews}review(s)</div> */}
            <div key={spot?.id} className='stateSpot'> {spot?.avgStarRating} · {reviewsObj.length} review(s) · {spot?.city}, {spot?.state}, {spot?.country}</div>
           </div>
           </div>

            {/* {currentUser && (
              <div className='editDeleteSpot'>
            <EditSpotModal />

              <button type="button" onClick={handleDelete} className='deleteButton'>Delete Spot</button>
            </div>
             )} */}
      </div>
          <div className='imgDivfs'>
         <img className='imageSpotfs' src={spot?.SpotImages.map(img => img.url)} alt="Image Is Not Available"/>
         </div>

            <div className='spot_info_header'>
            <div className='spot_left_info'>
            <div className='hostname'>Entire home hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
            <div className='emptyBorder1'/>
            <img className='aircover' src={aircover}></img>
            <div className='emptyBorder1'/>
           <div className='descriptSpot'>{spot?.description}</div>
           </div>

           <div className='spot_right_info'>
            <div className='spot_right_card_info'>
              <div className='spot_card_header'>
           <div className='priceSpotfs'><span id='priceSpotfs'>${spot?.price} </span>night</div>

          <div className='rightbox_review'><span id='reviewSpotfs'> <i className="fa-solid fa-star"/></span>{spot?.avgStarRating} · {reviewsObj?.length} review(s)</div>
            </div>
            <CreateBooking spot={spot} />
            </div>

            </div>

            </div>
<h2 className='spot-show-calendar'>Check Availability</h2>
                <CheckBooking spotId={spotId} />
           <div className='emptyBorder'/>
         <div className="bottom_review">
           <span className='bottomAvgCount'>
           <span className="fa-solid fa-star bigStar"/>
            {spot?.avgStarRating} · {reviewsObj?.length} review(s)
            </span>
            <span className='createReviewSpot'>
             {sessionUser && <CreateReviewModal spotId={spotId}/>}
           </span>
           <div className='allReviewSpot'>
            {reviewsObj.map(review => (
              <UserReviewNoEdit className='everyReview' key={review?.id} review={review}/>
            ))}
           </div>
           </div>
 </div>)}
</>
    )

}

export default FindSpot;
