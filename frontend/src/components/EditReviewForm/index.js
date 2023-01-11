import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import "./EditReviewForm.css";

function EditReviewModal({review}) {
  const [showModal, setShowModal] = useState(false);
  const allReviews = useSelector(state => state.reviews);
  useEffect(() => {
    setShowModal(false);
  }, [allReviews])
  return (
    <>
      <button className='editButton' onClick={() => setShowModal(true)}>
        Edit Review
        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm Review={Review} onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
