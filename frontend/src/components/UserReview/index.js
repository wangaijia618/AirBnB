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
  //  const review = reviewsObj.find(review => review.id == reviewId)
  // console.log(review)
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


      <div className="reviewsContainer">

      <div className='reviewName'>Review from  -<span className="reviewer">{review.User.firstName}</span></div>

      <div className='reviewDate'>{date}</div>

      <div className='review_content'>{review?.review}</div>

    <span className='reviewDivDelete'>
        {currentUser && (
          <span className='reviewDelete'>
            <button onClick={handleDelete} className='reviewDeleteButton'>Delete Review</button>
          </span>
        )}
       </span>

        </div>


  )
}

export default ReviewUser;
