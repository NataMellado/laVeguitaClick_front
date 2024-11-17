import { useState } from "react";

const useStatusModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setstatus] = useState(""); 

  const showStatusModal = (message, status) => {
    setMessage(message);
    setstatus(status); 
    setShowModal(true);
  };

  const hideStatusModal = () => {
    setShowModal(false);
    setMessage("");
    setstatus("");
  };

  return {
    showModal,
    message,
    status,
    showStatusModal,
    hideStatusModal,
    setShowModal,
  };
};

export default useStatusModal;
