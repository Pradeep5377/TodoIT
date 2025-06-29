import React, { useState } from 'react';

const ShareModal = ({ isOpen, onClose, onConfirm }) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Share Task</h3>
        <input
          type="email"
          placeholder="Enter user’s email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="modal-actions">
          <button
            onClick={() => {
              onConfirm(email.trim().toLowerCase());
              setEmail('');
            }}
          >
            Share
          </button>
          <button
            onClick={() => {
              setEmail('');
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
