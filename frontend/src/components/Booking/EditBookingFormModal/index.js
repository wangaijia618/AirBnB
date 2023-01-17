import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditBookingForm from './EditBookingForm';
import './EditBookingForm.css';

function EditBookingModal({ spotId, id }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="delete-booking-button" onClick={() => setShowModal(true)}>
                {/* <i className="fa-solid fa-pen-to-square"></i> */}
                Edit Reservation
            </button>
            {showModal && (
                <div className='edit-booking-modal'>
                    <Modal onClose={() => setShowModal(false)}>
                        <EditBookingForm onClose={() => setShowModal(false)} spotId={spotId} id={id} />
                    </Modal>
                </div>
            )}
        </>
    );
}

export default EditBookingModal;
