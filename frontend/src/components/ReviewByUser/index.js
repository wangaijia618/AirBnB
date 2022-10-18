import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import UserReview from "../UserReview";
import { getUserReview, allReviewsArray } from "../../store/reviews";
import "./ReviewByUser.css";
import { deleteReview } from "../../store/reviews";

const ReviewByUser = ({review}) => {
  const sessionUser = useSelector(state => state.session.user);
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const reviews = useSelector(state => state.reviews)
  useEffect(() => {
    dispatch(getUserReview());
  },[dispatch]);
  if (!reviews || Object.values(reviews).length===0){
    return null;
}
const handleDelete = async (reviewId) => {
  if (window.confirm('Confirm to delete this review?')){
      await dispatch(deleteReview(review.id, review.spotId))
      history.replace(`/reviews/current`)
  }
}

const reviewValues = Object.values(reviews);
return (
  <div className="my-reviews-container">
      {reviewValues.map((review) => (
        <div className="my-reviews-container" id={review.id} key={review.id}>
          <div className="my-reviews-list">
          {/* <div className="my-single-review-container"> */}
            <div className="my-single-review-spot-pic" >
                <img src={review.Spot?.previewImage} alt={review.Spot?.description}></img>
            </div>
            <div className="my-single-spot-review-title">
                <div className="spot-subtitle-text">
                  {review.Spot?.name===null? "" : `Review for ${review.Spot?.name}`}
                </div>
                <div className='rating-star'>
                      <i className="fa-solid fa-star fa-xs"></i>
                      {'\u00A0'}{review.stars}
                </div>
                {/* <div className="review-card-date">{getMonthYear(review.updatedAt)}</div> */}
            <div className="review-details">
              <div className="spot-default-text">{review.review}</div>
            </div>
            </div>

          </div>

          <div className="edit-delete-btn-panel">
                  <div className="edit-review-button-container">
                    <button className="create-review-button" disabled={true}>Eidt Review</button>
                    </div>
                    <div className="edit-review-button-container">
                      <button className="create-review-button" onClick={() => handleDelete(review.id)}>Delete Review</button>
                    </div>
                </div>
                {/* </div> */}

              </div>

            ))}
        </div>
      );

}
export default ReviewByUser;
