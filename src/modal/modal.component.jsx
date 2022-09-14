import React from "react";

const Modal = ({ displayModal, closeModal, modalInfo, user }) => {
  const divStyle = { display: displayModal ? "block" : "none" };

  modalInfo = <div className='modal-info'>{user.name.first}</div>;
  const closeModalHere = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div className='modal' onClick={closeModalHere} style={divStyle}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <span className='close' onClick={closeModalHere}>
          {modalInfo}
          &times;
        </span>
        <div className='modal-flex'></div>
      </div>
    </div>
  );
};

export default Modal;
