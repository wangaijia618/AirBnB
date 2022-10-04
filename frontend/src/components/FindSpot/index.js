import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {getOneSpot, allSpotsArray, allSpotsObj, removeSpot, editSpot} from '../../store/spots';
import {allReviewsArray, getSpotReview} from '../../store/reviews';
 import CreateReviewModal from '../CreateReviewModal';

import UserReview from '../UserReview';
import "./FindSpot.css";
import EditSpotModal from "../EditSpotForm";


const FindSpot = () => {
  let currentUser;
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
// export const allSpotsObj = state => state.spots
  const spot = useSelector(state => state.spots.singleSpot);
  // export const allReviewsArray = (state) => Object.values(state.reviews);
  const reviewsObj = useSelector(allReviewsArray);
  // const reviewsObj = useSelector(state => state.reviews.spot)
  // const [isLoaded, setIsLoaded] = useState(false)
  //in use
    // const spot = spotsObj[+spotId]; //or using Number(spotId)
    // const spot = useSelector(state => state.spots)
   console.log(~~~~~~~~~~spotId)
    console.log(~~~~~~~~~~~~~~spot)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getSpotReview(spotId))
    // .then(() => setIsLoaded(true))
  }, [dispatch, spotId])

  const handleDelete = async (e) => {
  e.preventDefault();
  const res = await dispatch(removeSpot(spotId))
  if (res) history.push("/")
}

if (sessionUser && spot) {
  if (sessionUser.id === spot.ownerId) {
    currentUser = true;
  } else currentUser = false;
}
if(!spot.SpotImages) return null
// if (Object.keys(spot).length === 0) return null
return (

      <>
      <div className='firstDiv'/>
      <div className='topText'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='ratingSpot'>
            <div className='outsideStar'>
           <div className="fa-solid fa-star"/>
         <div></div>
           <div>{spot?.avgStarRating} ·  {spot?.city} , {spot?.countReviews} </div>
            <div key={spot?.id} className='stateSpot'>   {spot?.state}, {spot?.country}</div>
           </div>
           </div>

            {currentUser && (
              <div className='editDeleteSpot'>
            <EditSpotModal spot={spot}/>
              <button onClick={handleDelete} className='deleteButton'>Delete Spot</button>
            </div>
             )}
      </div>
          <div className='imgDivfs'>
         <img className='imageSpotfs' src={spot?.SpotImages.map(img => img.url)} alt="Image Is Not Available"/> </div>
         {/* {oneSpotById.SpotImages.map(img =>
                    (<img key={img.id} src={img.url} alt={img.url} />)
                )} */}

           <div className='bottomText'>
            <div className='right_box'>
           <div className='priceSpot'>${spot?.price} night</div>
         
          <div className='rightbox_review'> {spot?.avgStarRating} · {spot?.numReviews} reviews</div>
            </div>
           <div className='descriptSpot'>{spot?.description}</div>
           <div className='createReviewSpot'>
             {sessionUser && <CreateReviewModal spotId={spotId}/>}
             {/* {sessionUser && <CreateReviewModal />} */}
           </div>
           <div className='emptyBorder'/>
           <div className='bottomAvgCount'>
           <div className="fa-solid fa-star bigStar"/>
            {spot?.avgStarRating} · {spot?.numReviews} reviews
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
