import { React, useEffect, useState } from "react";
import Modal from "../modal/modal.component";
import logo from "../assets/logo192.png";

import "./pagination.style.css";

const Pagination = ({ userArray, loading }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  let [selected, setSelected] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    name: { first: "first", last: "last" },
    title: "title",
    gender: "male",
    picture: {
      large: "",
    },
    dob: { age: 20, date: "1972-01-12T13:30:12.077Z" },
    location: {
      city: "city",
      country: "country",
      postcode: 123456,
      state: "state",
    },
  });

  const totalPageCount = Math.ceil(userArray.length / recordsPerPage);
  const now = new Date(modalInfo.dob.date);
  const day = `${now.getDay()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();

  const pageNumber = [];
  for (var i = 1; i <= totalPageCount; i++) {
    pageNumber.push(i);
  }

  useEffect(() => {
    const firstRecord = (currentPageNumber - 1) * recordsPerPage;
    const lastRecord =
      (currentPageNumber - 1) * recordsPerPage + (recordsPerPage - 1);
    const newRecords = userArray.slice(firstRecord, lastRecord + 1);
    setCurrentRecords(newRecords);
  }, [userArray, currentPageNumber, recordsPerPage]);

  const pageSize = (event) => {
    setRecordsPerPage(Number(event.target.value));
  };

  const onChangeHandler = (event) => {
    setSearchField(
      event.target.value.toLocaleLowerCase().replace(/\s+/g, " ").trim()
    );
  };

  const selectModal = (user) => {
    setDisplayModal(displayModal ? false : true);
    user && setModalInfo(user);
  };

  const openAccordion = (index) => {
    const abc = currentRecords.map((user) => {
      if (user.uid - 1 === index) {
        user.selected = true;
        setSelected(!selected);
        // console.log(`  if: ${user.uid}, index: ${index} ,${user.selected}`);
        // console.log(user);
        return user;
      } else {
        user.selected = false;
        setSelected(!selected);
        // console.log(`else: ${user.uid}, index: ${index},${user.selected}`);
        return user;
      }
    });

    setCurrentRecords(abc);
  };

  const closeAccordion = (index) => {
    console.log("clicked");
    const abc = currentRecords.map((user) => {
      if (user.uid - 1 === index) {
        user.selected = false;
        setSelected(!selected);
        console.log(`  if: ${user.uid}, index: ${index} ,${user.selected}`);
        // console.log(user);
        return user;
      } else {
        setSelected(!selected);
        return user;
      }
    });
    setCurrentRecords(abc);
  };

  if (loading) return <div className='center'>Loading...</div>;

  return (
    <div className='div-root'>
      <img style={{ height: 30, width: 30 }} src={logo} alt='logo' />
      <input
        className='search-box '
        type='search'
        placeholder='Search User'
        onChange={(event) => onChangeHandler(event)}
      />
      <div>
        <tr className='table-row_head'>
          <td className='table-row_data'>Name</td>
          <td className='table-row_data'>Age</td>
          <td className='table-row_data'>Email</td>
          <td className='table-row_data'>Phone</td>
          <td className='table-row_data'> </td>
        </tr>
        {currentRecords
          .filter((user) => {
            return (
              user.name.first.toLocaleLowerCase().includes(searchField) ||
              user.name.last.toLocaleLowerCase().includes(searchField)
            );
          })
          .map((user, index) => (
            <div className='accordion div-row' id='accordionExample'>
              <div className='accordion-item'>
                <h4 className='accordion-header' id='headingOne'>
                  <div
                    onClick={() => {
                      openAccordion(index);
                    }}
                    style={{ padding: 0 }}
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'>
                    <tr className='table-row'>
                      <td>
                        <img src={user.picture.thumbnail} alt='Profile' />
                      </td>
                      <td>
                        {user.name.first} {user.name.last}
                      </td>
                      <td>{user.dob.age} </td>
                      <td> {user.email}</td>
                      <td> {user.phone}</td>
                      <td>
                        {!displayModal && (
                          <button
                            style={{ margin: 20 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              selectModal(user);
                            }}
                            className='btn btn-outline-info'>
                            more...
                          </button>
                        )}
                        <Modal
                          className='modal'
                          displayModal={displayModal}
                          modalInfo={modalInfo}
                          closeModal={selectModal}
                        />
                      </td>
                    </tr>
                  </div>
                </h4>
                <div
                  onClick={() => closeAccordion(index)}
                  id='collapseOne'
                  className={`accordion-collapse collapse ${
                    user.selected === true ? "show" : ""
                  }`}
                  aria-labelledby='headingOne'
                  data-bs-parent='#accordionExample'>
                  <div className='accordion-body table-row'>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        backgroundColor: "#f2ead5",
                      }}>
                      <img src={user.picture.medium} alt='Profile' />
                      <h5>
                        Name: {user.name.first} {user.name.last}
                      </h5>
                      <h5>
                        Age: {user.dob.age}, Date of Birth: {day}/{month}/{year}
                      </h5>
                      <h5> Gender: {user.gender}</h5>
                      <h5>
                        Address: {user.location.city}, {user.location.state},{" "}
                        {user.location.country}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      <nav className='pagination-row'>
        {pageNumber.map((page, index) => (
          <button
            key={index}
            onClick={() => setCurrentPageNumber(page)}
            className='my-button'
            style={{
              backgroundColor: currentPageNumber === page ? "#1e293b" : "#fff",
              color: currentPageNumber === page ? "#fff" : "#1e293b",
            }}>
            <span>{page}</span>
            <br />
          </button>
        ))}{" "}
        <span>
          <select
            onClick={pageSize}
            onChange={() => {
              setCurrentPageNumber(1);
            }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </span>
        <br />
        <span>
          page {pageNumber[0]} to {pageNumber[pageNumber.length - 1]}
        </span>
      </nav>
    </div>
  );
};

export default Pagination;
