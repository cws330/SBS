import React, { useEffect } from "react";
import { queryAllDocs } from "../../components/CRUD";
import { useState } from "react";
import { Link } from "react-router-dom";
import { companyData } from "../../context/commonConst";

const ViewUsers = () => {
  const [ourUsers, setOurUsers] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(
    (ourUsers) => {
      async function fetchData() {
        await queryAllDocs(
          `companies/${companyData}/users`,
          ourUsers,
          setOurUsers,
          10
        );

        setDataFetched(true);
      }
      if (!dataFetched) {
        fetchData();
      }
    },
    [dataFetched]
  );

  let count = 0;
  return (
    <>
      <div>View Users</div>

      <div className='container'>
        {ourUsers.map((user) => {
          count++;
          return (
            <div className='card' key={user.id}>
              <div className='box'>
                <div className='content'>
                  <h2>{count}</h2>
                  <h3>
                    {user.firstName} {user.lastName}
                  </h3>
                  <p>Phone: {user.phone}</p>
                  <p>User Level: {user.userLevel}</p>
                  <Link to={"/editUser/" + user.id}>Edit User</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewUsers;
