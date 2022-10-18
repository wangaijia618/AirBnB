import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';
import "./EditSpotForm.css";

function EditSpotModal({spot}) {
  const [showModal, setShowModal] = useState(false);
  const allSpots = useSelector(state => state.spots);
  useEffect(() => {
    setShowModal(false);
  }, [allSpots])
  return (
    <>
      <button className='editButton' onClick={() => setShowModal(true)}>
        Edit Spot
        </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditSpotForm spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default EditSpotModal;
