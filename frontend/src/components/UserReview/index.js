import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { deleteReview, editReview} from "../../store/reviews";
import "./UserReview.css";
import ReviewFormModal from '../EditReviewForm';


function UserReview({review}) {
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
    <>
    {/* <img className ="small-preview" src={review.Spot?.previewImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"}></img> */}

      <div className="reviewsContainer">

      {/* <div className='reviewName'>Review from  -<span className="reviewer">{review.User.firstName}</span></div> */}
      <div style={{fontWeight: "bold", fontSize: "20px"}}>{review.Spot.city}, {review.Spot.state}</div>
      <div>Review for {review.Spot.name}</div>


      <div className='reviewDate'>{date}</div>

      <div className='review_content'>{review?.review}</div>

    <span className='reviewDivDelete'>
        {currentUser && (
          <span className='reviewDelete'>
         {/* <button onClick={handleSubmit} className='reviewDeleteButton'>Edit</button> */}
         <ReviewFormModal user={true} spotId={review.spotId} change='Edit' reviewId={review.id}/>
            <button onClick={handleDelete} className='reviewDeleteButton'>Delete Review</button>
          </span>
        )}
       </span>

        </div>

</>
  )
}

export default UserReview;
