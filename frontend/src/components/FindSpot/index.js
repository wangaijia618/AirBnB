import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {getOneSpot, allSpotsArray, allSpotsObj, removeSpot, editSpot} from '../../store/spots';
// import {allReviewsArray, getAllReviewsBySpot} from '../../store/reviews';
//  import CreateReviewModal from '../CreateReviewModal';
// import EditSpotForm from "./EditSpotForm";
// import UserReview from '../UserReview';
import "./FindSpot.css";
import EditSpotModal from "../EditSpotForm";


const FindSpot = () => {
  let currentUser;
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const spotsObj = useSelector(allSpotsObj);

  const [isLoaded, setIsLoaded] = useState(false)
  //in use
    // const spot = spotsObj[Number(spotId)];
    const spot = useSelector(state => state.spots[spotId])

    console.log(~~~~~~~~~spot)
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getOneSpot(spotId))

  //   // .then(() => dispatch(getAllReviewsBySpot(spotId)))
    .then(() => setIsLoaded(true))
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
// if(!spot) return null
  return isLoaded && (
// return (

      <>
      <div className='firstDiv'/>
      <div className='topText'>
          <div className="nameSpot">{spot?.name}</div>
           <div className='ratingSpot'>
            <div className='outsideStar'>
           <div className="fa-solid fa-star"/>
         <div></div>
           <div>{spot?.avgRating} ·  {spot?.city} , {spot?.countReviews} </div>
            <div key={spot?.id} className='stateSpot'>   {spot?.state}, {spot?.country}</div>
           </div>
           </div>

            {currentUser && (
              <div className='editDeleteSpot'>
            <EditSpotModal />
              <button onClick={handleDelete} className='deleteButton'>Delete Spot</button>
            </div>
             )}
      </div>
          <div className='imgDivfs'>
         <img className='imageSpotfs' src={spot?.previewImage} alt="Image Is Not Available"/> </div>


           <div className='bottomText'>
            <div className='priceNightfs'>
           <div className='pricesSpot'>${spot?.price}</div>
           <div className='nightsSpot'>night</div>
            </div>
           <div className='descriptSpot'>{spot?.description}</div>
           <div className='createReviewSpot'>
             {/* {sessionUser && <CreateReviewModal spotId={spotId}/>} */}
           </div>
           <div className='emptyBorder'/>
           <div className='bottomAvgCount'>
           <div className="fa-solid fa-star bigStar"/>
            {spot?.avgRating} · {spot?.countReviews} reviews
            </div>
           {/* <div className='allReviewSpot'>
            {reviewsObj.map(review => (
              <UserReview key={review?.id} review={review}/>
            ))}
           </div> */}
           </div>
      </>
    )

}

export default FindSpot;
