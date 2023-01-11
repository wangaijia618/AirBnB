import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { deleteReview, editReview} from "../../store/reviews";
import "./UserReview.css";
import ReviewFormModal from '../EditReviewForm';


function UserReviewNoEdit({review}) {
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
  const reviewToEdit = useSelector(state => state.reviews[review.id]);
  const [stars, setStars] = useState(reviewToEdit ? reviewToEdit.stars : 5);
  const [reviewa, setReviewa] = useState(reviewToEdit ? reviewToEdit.review : "");


  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewInfo = {
      review,
      stars
    };

    // setErrors([]);
    dispatch(editReview(review.id, reviewInfo))
          // .then(() => onClose())
          .catch(
              async (res) => {
                  const data = await res.json();
                  // if (data) setErrors(data);
              }
          );
  }

  let currentUser;
  if (sessionUser && review) {
    if (sessionUser.id === review.userId) {
      currentUser = true;
    } else currentUser = false;
  }

  const handleDelete = () => {
    dispatch(deleteReview(review.id))
  }

  // const handleSpot = () => {
  //   history.push(`/spot/${spotId}`)
  // }

  return (


      <div className="reviewsContainer">

      <div className='reviewName'>Review from  -<span className="reviewer">{review.User.firstName}</span></div>

      <div className='reviewDate'>{date}</div>

      <div className='review_content'>{review?.review}</div>

    {/* <span className='reviewDivDelete'>
        {currentUser && (
          <span className='reviewDelete'>

            <ReviewFormModal user={true} spotId={review.spotId} change='Edit' reviewId={review.id} />
            <button onClick={handleDelete} className='reviewDeleteButton'>Delete Review</button>
          </span>
        )}
       </span> */}

        </div>


  )
}

export default UserReviewNoEdit;
