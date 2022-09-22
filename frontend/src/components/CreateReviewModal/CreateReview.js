import React, { useState } from 'react';
import {createReview} from "../../store/reviews";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './CreateReview.css';

function ReviewForm() {
  const {spotId} = useParams();
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewInfo = {
      review,
      stars
    };

    setErrors([]);
    dispatch(createReview(reviewInfo, spotId)).catch(async (res) => {
      const data = await res.json();
      console.log('data', data)
      if (data && data.errors) setErrors(data.errors);
      else if (data && data.message) setErrors([data.message]);
    })
  }

  return (
    <form onSubmit={handleSubmit} className='reviewForm'>
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
