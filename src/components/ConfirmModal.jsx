import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ConfirmModal = ({ 
  message, 
  showModal, 
  setShowModal, 
  onConfirm, 
  onCancel 
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-yellow-500">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <div className="text-center">
          <div className="text-yellow-500 text-4xl mb-4">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
          <p className="text-lg font-semibold">{message}</p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
            >
              Confirmar
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
