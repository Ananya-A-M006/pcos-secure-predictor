import React from "react";

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
