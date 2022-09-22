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
      {/* <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', height: '35px', width: '35px', fill: 'gray'}}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg> */}
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
