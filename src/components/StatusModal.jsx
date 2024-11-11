import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const StatusModal = ({ message, type, showModal, setShowModal }) => {
  if (!showModal) return null;

  const typeStyles = {
    success: "bg-green-100 text-green-700 border-green-500",
    error: "bg-red-100 text-red-500 border-red-500",
    alert: "bg-yellow-100 text-yellow-700 border-yellow-500",
  };

  const icons = {
    success: <FontAwesomeIcon icon={faCheckCircle} />,
    error: <FontAwesomeIcon icon={faTimesCircle} />,
    alert: <FontAwesomeIcon icon={faExclamationTriangle} />,
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className={`p-6 bg-white rounded-lg shadow-lg border-l-4 ${typeStyles[type]}`}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <div className="text-center">
          <div className="text-4xl mb-4">{icons[type]}</div>
          <p className="text-lg font-semibold">{message}</p>
          <button
            onClick={() => setShowModal(false)}
            className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
