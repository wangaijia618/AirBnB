import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import UserReview from "../UserReview";
import { getUserReview, allReviewsArray } from "../../store/reviews";
import "./ReviewByUser.css";
const ReviewByUser = () => {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const allReviews = useSelector(allReviewsArray);
  // const reviews = allReviews.map(review => review.userId ===)
  useEffect(() => {
    dispatch(getUserReview());
  },[dispatch]);

  return allReviews.length?(
    <>
    <div className='ReviewsTitle'>My Reviews</div>
    <div className='emptyBordercurrent'/>
    <div className='MyReviews'>
    {allReviews.map((review) => (
      <UserReview key={review?.id} review={review}/>
      ))}
      </div>
      </>
  )
  :(
    <>
             <h1 className='no_review_found'>You currently have no review !</h1>

         </>
         )
}
export default ReviewByUser;
