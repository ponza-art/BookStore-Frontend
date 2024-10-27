import React from "react";

const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg overflow-auto max-w-2xl w-full p-4">
      <button className="text-red-500 float-right" onClick={onClose}>
        Close
      </button>
      {children}
    </div>
  </div>
);

export default Modal;
