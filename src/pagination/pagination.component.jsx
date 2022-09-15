import { React, useEffect, useState } from "react";
import Modal from "../modal/modal.component";

import "./pagination.style.css";

const Pagination = ({ userArray, loading }) => {
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    name: { first: "first", last: "last" },
    title: "title",
    gender: "male",
    picture: {
      large: "",
    },
    dob: { age: 20, date: "" },
    location: {
      city: "city",
      country: "country",
      postcode: 123456,
      state: "state",
    },
  });

  const totalPageCount = Math.ceil(userArray.length / recordsPerPage);
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

  const newCurrentRecords = userArray.filter((user) => {
    return (
      user.name.first.toLocaleLowerCase().includes(searchField) ||
      user.name.last.toLocaleLowerCase().includes(searchField)
    );
  });

  const onChangeHandler = (event) => {
    setSearchField(
      event.target.value.toLocaleLowerCase().replace(/\s+/g, " ").trim()
    );
    setSearchResults(newCurrentRecords);
    setCurrentPageNumber(1);

    if (
      searchField !== currentRecords.name.first ||
      searchField !== currentRecords.name.last
    ) {
      return <div>No results</div>;
    }

    if (event.target.value === "") {
      setSearchResults([]);
      setSearchField("");
    }
  };

  const selectModal = (user) => {
    setDisplayModal(displayModal ? false : true);
    user && setModalInfo(user);
  };

  if (loading) return <div className='center'>Loading...</div>;

  return (
    <div className='div-content'>
      <div className='center'>
        <input
          className='search-box '
          type='search'
          placeholder='Search User'
          onChange={(event) => onChangeHandler(event)}
        />

        <tr className='table-row'>
          <td> </td>
          <td>Name</td>
          <td>Age</td>
          <td>Email</td>
          <td>Phone</td>
        </tr>

        {searchResults.length === 0 || searchField === ""
          ? currentRecords.map((user, index) => (
              <tr key={index}>
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
                      onClick={() => selectModal(user)}
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
            ))
          : searchResults.map((user, index) => (
              <tr key={index}>
                <img src={user.picture.thumbnail} alt='Profile' />
                <td>
                  {user.name.first} {user.name.last}
                </td>
                <td>{user.dob.age} </td>
                <td> {user.email}</td>
                <td> {user.phone}</td>
                <td>
                  {!displayModal && (
                    <button
                      onClick={() => selectModal(user)}
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
            ))}
      </div>
      <nav>
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
          <select onClick={pageSize} onChange={() => {}}>
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
