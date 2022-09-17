import React, { useEffect, useState } from "react";
import Pagination from "../pagination/pagination.component";

import "./users.style.css";

const Users = () => {
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://randomuser.me/api?results=27`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        response.results.map((user) => (user.selected = false));
        setUserArray(response.results);
        setLoading(false);
      })
      .catch((e) => {
        if (e) window.location.reload();
      });
  }, []);

  return (
    <div>
      <Pagination userArray={userArray} loading={loading} />
    </div>
  );
};

export default Users;
