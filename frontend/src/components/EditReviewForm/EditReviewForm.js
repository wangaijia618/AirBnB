

import React, { useState } from "react";
import { createReview, editReview, getSpotReview } from '../../store/reviews';
import { useDispatch, useSelector } from "react-redux";
import './EditReviewForm.css';
import { getOneSpot } from "../../store/spots";

function ReviewForm({ spotId, onClose, change, reviewId }) {
    const dispatch = useDispatch();
    const reviewToEdit = useSelector(state => state.reviews[reviewId]);
    const [stars, setStars] = useState(reviewToEdit ? reviewToEdit.stars : 5);
    const [review, setReview] = useState(reviewToEdit ? reviewToEdit.review : "");
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session)
console.log("RRRRRRRRRRRRReviewId", reviewId)
console.log("SSSSSSSSSSSSSSSSpotId", spotId)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (reviewId) {
            dispatch(editReview(reviewId, { stars, review }, user))
                .then(() => onClose())
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data) setErrors(data);
                    }
                );
        }
        else {
            dispatch(createReview(spotId, { stars, review }, user))
                .then(() => onClose())
                .then(() => dispatch(getOneSpot(spotId)))
                .then(() => dispatch(getSpotReview(spotId)))
                .catch(
                    async (res) => {
                        const data = await res.json();
                        if (data) setErrors(data);
                    }
                );
        }
    };


    return (
        <div className='review-form'>
            <div className='reviewform-title'>
                <button className='review-form-close-btn' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <p className="review-text">{change} Your Review</p>
            </div>
            <form onSubmit={handleSubmit}>
                <p className="review-from-welcome">Thanks for sharing your thoughts.</p>
                <ul>
                    {errors.message}
                </ul>
                <div className="form-element">
                    <label className="stars">
                        stars
                        <input
                            type="number"
                            min='1'
                            max='5'
                            value={stars}
                            onChange={(e) => setStars(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-element">
                    <label>
                        Review Content
                        <textarea
                            value={review}
                            rows='6'
                            cols='53'
                            maxLength='250'
                            onChange={(e) => setReview(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="form-element">
                    <button type="submit">Submit</button>
                </div>
            </form >
        </div>
    );
}

export default ReviewForm;
