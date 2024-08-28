import React from 'react';
import './ConfirmationModal.css'; // Ensure you have styles for the modal

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal-content">
        <p>{message}</p>
        <div className="confirmation-modal-buttons">
          <button className="cancel-button" onClick={onCancel}>Stay</button>
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
