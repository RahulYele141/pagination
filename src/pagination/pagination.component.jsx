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
  const [hidden, setHidden] = useState("hidden");
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

  const showData = (e, user) => {
    console.log(e.target.innerText);
    user.email === e.target.innerText
      ? setHidden("show-data")
      : setHidden("hide-data");
    return user;
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
      <div className='center'>
        <table>
          <tr className='table-row'>
            <td> </td>
            <td>Name</td>
            <td>Age</td>
            <td>Email</td>
            <td>Phone</td>
          </tr>

          {currentRecords
            .filter((user) => {
              return (
                user.name.first.toLocaleLowerCase().includes(searchField) ||
                user.name.last.toLocaleLowerCase().includes(searchField)
              );
            })
            .map((user, index) => (
              <tr key={index} onClick={(event) => showData(event, user)}>
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
                {hidden === "show-data" && user.email ? (
                  <div className='show-data'> Here is my data</div>
                ) : (
                  <div className='hide-data'> Here is my data</div>
                )}
              </tr>
            ))}
        </table>
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
