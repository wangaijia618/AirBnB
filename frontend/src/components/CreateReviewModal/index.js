import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import CreateReview from './CreateReview';
import {allSpotsObj} from '../../store/spots';
import "./CreateReview.css";

function CreateReviewModal() {
  let currentUser;
  const {spotId} = useParams();
  const spotsObj = useSelector(allSpotsObj);
  const spot = spotsObj[Number(spotId)];
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
        <button className='reviewDeleteButton' onClick={() => setShowModal(true)}>
        Write Review
        </button>
        )}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReview />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
