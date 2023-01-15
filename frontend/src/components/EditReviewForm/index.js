// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Modal } from '../../context/Modal';
// import EditReviewForm from './EditReviewForm';
// import "./EditReviewForm.css";

// function EditReviewModal({review}) {
//   const [showModal, setShowModal] = useState(false);
//   const allReviews = useSelector(state => state.reviews);
//   useEffect(() => {
//     setShowModal(false);
//   }, [allReviews])
//   return (
//     <>
//       <button className='editButton' onClick={() => setShowModal(true)}>
//         Edit Review
//         </button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EditReviewForm review={review} onClose={() => setShowModal(false)} />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default EditReviewModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from './EditReviewForm';
import LoginForm from '../LoginFormModal/LoginForm';
import './EditReviewForm.css';

function ReviewFormModal({ user, spotId, change, reviewId }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='add-review-btn' onClick={() => setShowModal(true)}>{change}Review</button>
            {showModal && (
                <div className='review-form-modal'>
                    <Modal onClose={() => setShowModal(false)}>
                        {user ? <ReviewForm onClose={() => setShowModal(false)} spotId={spotId} change={change} reviewId={reviewId} />
                            : <LoginForm onClose={() => setShowModal(false)} />}
                    </Modal>
                </div>
            )}
        </>
    );
}

export default ReviewFormModal;
