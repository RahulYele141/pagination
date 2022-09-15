import React from "react";
import "./modal.style.css";

const Modal = ({ displayModal, closeModal, modalInfo }) => {
  const divStyle = { display: displayModal ? "block" : "none" };

  const closeModalHere = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const now = new Date(modalInfo.dob.date);
  const day = `${now.getDay()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();

  return (
    <div className='modal-root'>
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
                  <h4>
                    Age: {modalInfo.dob.age}, Date of Birth: {day}/{month}/
                    {year}
                  </h4>
                  <h4> Gender: {modalInfo.gender}</h4>
                  <h4>
                    Address: {modalInfo.location.city},{" "}
                    {modalInfo.location.state}, {modalInfo.location.country}
                  </h4>
                </div>
              }
            </div>
          }
          <div className='modal-flex'></div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
