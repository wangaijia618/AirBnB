import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { deleteReview } from "../../store/reviews";
import "./UserReview.css";

function ReviewUser({review}) {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const date = new Date().toLocaleDateString();
  // const {reviewId} = useParams
  // const allReviews = (state) => Object.values(state.reviews)
  // const reviewsObj = useSelector(allReviews);
  // const review = reviewsObj.find(review => review.id == reviewId)
  let currentUser;
  if (sessionUser && review) {
    if (sessionUser.id === review.userId) {
      currentUser = true;
    } else currentUser = false;
  }

  const handleDelete = () => {
    dispatch(deleteReview(review.id, review.spotId))
  }

  // const handleSpot = () => {
  //   history.push(`/spot/${spotId}`)
  // }

  return (
    <div className='reviewSquare'>
    <div className='reviewBox'>
      <div className="reviewsContainer">
      <div className='reviewProfile'>
      <div className='reviewUserIcon'>
      <div className="fa-solid fa-user"/>

      </div>
      <div className='reviewName'>Review-User#{review?.userId}</div>
      </div>
      <div className='reviewDate'>{date}</div>
      <div className='dateReview'>
      <div className='reviewReview'>
      <div className="fa-solid fa-star"/>{review?.stars} : {review?.review}</div>
      </div>
      <div className='reviewDivDelete'>
        {currentUser && (
          <div className='reviewDelete'>
            <button onClick={handleDelete} className='reviewDeleteButton'>Delete Review</button>
          </div>
        )}
      </div>
        </div>
    </div>
  </div>
  )
}

export default ReviewUser;
