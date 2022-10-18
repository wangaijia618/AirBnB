import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import ReviewForm from './CreateReview';
import {allSpotsObj} from '../../store/spots';
import "./CreateReview.css";

function CreateReviewModal() {
  let currentUser;
  const {spotId} = useParams();
  // const spotsObj = useSelector(allSpotsObj);
  // const spot = spotsObj[+spotId];
  const spot = useSelector(state => state.spots.singleSpot)
  const [showModal, setShowModal] = useState(false);
  const allReviews = useSelector(state => state.reviews);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    setShowModal(false);
  }, [allReviews])

  if (sessionUser && spot) {
    if (sessionUser.id === spot.ownerId) {
      currentUser = false;
    } else currentUser = true;
  }

  return (
    <>
      {currentUser && (
        <button className='reviewButton' onClick={() => setShowModal(true)}>
        Write a Review
        </button>
        )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
