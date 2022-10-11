import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {getOneSpot, allSpotsArray, allSpotsObj, removeSpot, editSpot} from '../../store/spots';
import {allReviewsArray, getSpotReview} from '../../store/reviews';
import CreateReviewModal from '../CreateReviewModal';

import UserReview from '../UserReview';
import "./FindSpot.css";
import EditSpotModal from "../EditSpotForm";
// replaced {spot?countReviews} with {reviewsObj?.length} to update review immidiately

const FindSpot = () => {
  let currentUser;
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
// export const allSpotsObj = state => state.spots
  const spot = useSelector(state => state.spots.singleSpot);
  // export const allReviewsArray = (state) => Object.values(state.reviews);
  const reviewsObj = useSelector(allReviewsArray);
  //  const reviews = useSelector(state => state.reviews.spot)
  // const reviewContent = Object.values(reviews)
  // const reviewsObj = useSelector(state => state.reviews.spot)
  // const [isLoaded, setIsLoaded] = useState(false)
  //in use
    // const spot = spotsObj[+spotId]; //or using Number(spotId)
    // const spot = useSelector(state => state.spots)
  //  console.log(~~~~~~~~~~spotId)
  //   console.log(~~~~~~~~~~~~~~spot)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getSpotReview(spotId))
    // .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  const handleDelete = async (e) => {
  e.preventDefault();
  await dispatch(removeSpot(spotId))
  history.push("/")
}

if (sessionUser && spot) {
  if (sessionUser.id === spot.ownerId) {
    currentUser = true;
  } else currentUser = false;
}
if(!spot.SpotImages) return null
if (Object.keys(spot).length === 0) return null
return (

      <>
      <div className='single_spot_infos'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='rating_top_spot'>
            <div className='outsideStar'>
           <i className="fa-solid fa-star"/>
           {/* <div>{spot?.avgStarRating} · {spot?.countReviews}review(s)</div> */}
            <div key={spot?.id} className='stateSpot'> {spot?.avgStarRating} · {reviewsObj.length} review(s) · {spot?.city}, {spot?.state}, {spot?.country}</div>
           </div>
           </div>

            {currentUser && (
              <div className='editDeleteSpot'>
            <EditSpotModal />
              {/* <button onClick={handleDelete} className='deleteButton'>Delete Spot</button> */}
              <button type="button" onClick={handleDelete} className='deleteButton'>Delete Spot</button>
            </div>
             )}
      </div>
          <div className='imgDivfs'>
         <img className='imageSpotfs' src={spot?.SpotImages.map(img => img.url)} alt="Image Is Not Available"/> </div>
         {/* {oneSpotById.SpotImages.map(img =>
                    (<img key={img.id} src={img.url} alt={img.url} />)
                )} */}
              <div className='spot_bottom_text'>
            <div className='spot_right_box'>
           <span className='priceSpotfs'>${spot?.price} night</span>

          <span className='rightbox_review'> <i className="fa-solid fa-star"/>{spot?.avgStarRating} · {reviewsObj?.length} review(s)</span>
            </div>
            <div className='spot_left_info'>
            <div className='hostname'>Entire home hosted by {spot.Owner.firstName}</div>
            <div className='emptyBorder1'/>
           <div className='descriptSpot'>{spot?.description}</div>
           </div>
           <div className='emptyBorder'/>
           <div className='createReviewSpot'>
             {sessionUser && <CreateReviewModal spotId={spotId}/>}
           </div>
           <div className='emptyBorder'/>
           <div className='bottomAvgCount'>
           <div className="fa-solid fa-star bigStar"/>
            {spot?.avgStarRating} · {reviewsObj?.length} review(s)
            </div>
           <div className='allReviewSpot'>
            {reviewsObj.map(review => (
              <UserReview className='everyReview' key={review?.id} review={review}/>
            ))}
           </div>
           </div>
      </>
    )

}

export default FindSpot;
