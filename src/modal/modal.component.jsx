import React from "react";
import "./modal.style.css";

const Modal = ({ displayModal, closeModal, modalInfo }) => {
  const divStyle = { display: displayModal ? "block" : "none" };

  const closeModalHere = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <div className='modal' onClick={closeModalHere} style={divStyle}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <span className='close' onClick={closeModalHere}>
          &times;
        </span>
        {
          <div className='modal-info'>
            {
              <div>
                <img src={modalInfo.picture.large} alt='Profile' />
                <h3>
                  Name: {modalInfo.name.first} {modalInfo.name.last}
                </h3>
                <h3> Age: {modalInfo.dob.age}</h3>
                <h3> Gender: {modalInfo.gender}</h3>
                <h4>
                  Address: {modalInfo.location.city} {modalInfo.location.state}{" "}
                  {modalInfo.location.country}
                </h4>
              </div>
            }
          </div>
        }
        <div className='modal-flex'></div>
      </div>
    </div>
  );
};

export default Modal;
