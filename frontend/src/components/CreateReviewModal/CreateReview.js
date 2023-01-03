import React, { useState } from 'react';
import {createReview, editReview} from "../../store/reviews";
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './CreateReview.css';
import {Link, NavLink} from 'react-router-dom';
import {Redirect} from 'react-router-dom'
function ReviewForm({onClose, reviewId}) {
  const history = useHistory();
  const {spotId} = useParams();
  const dispatch = useDispatch();
  // const reviewToEdit = useSelector(state => state.reviews[reviewId]);
  // const [stars, setStars] = useState(reviewToEdit ? reviewToEdit.stars : 5);
  // const [review, setReview] = useState(reviewToEdit ? reviewToEdit.review : "");
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');
  const [errors, setErrors] = useState([]);
  const user = useSelector(state => state.session)
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewInfo = {
      review,
      stars
    };

    setErrors([]);
  //   if (reviewId) {
  //     dispatch(editReview(reviewId, { stars, review }))
  //         .then(() => onClose())
  //         .catch(
  //             async (res) => {
  //                 const data = await res.json();
  //                 if (data) setErrors(data);
  //             }
  //         );
  // } else {
    dispatch(createReview(reviewInfo, spotId, user)).catch(async (res) => {
      const data = await res.json();
      console.log('data', data)
      if (data && data.errors) setErrors(data.errors);
      else if (data && data.message) setErrors([data.message]);
    })

  }

  return (
    <form onSubmit={handleSubmit} className='reviewForm'>
       <button className='write-review-close-btn' onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
                </button>
      <div className='reviewTitle'>
        <h2 className='reviewHTitle'>Review</h2>
      </div>
      <div>
        {Object.values(errors).map((error, idx) => (
          <div key={idx} className='reviewErrors'>{error}</div>
        ))}
      </div>
      <div className='reviewDescription'>
          <input
            type="text"
            placeholder='Description'
            className='userReview'
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            />
      </div>
      <div className='reviewStars'>
        <input
          type="number"
          placeholder='Rate from 1-5 Stars'
          min="0"
          max="5"
          className='userStar'
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
          />
      </div>
      <div>

        <button
        type="submit"
        className="submitReview">
          Create Review
          </button>

      </div>
    </form>
  )
}

export default ReviewForm;
