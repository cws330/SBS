import React, { useEffect } from "react";
import { queryAllDocs } from "../../components/CRUD";
import { useState } from "react";
import "./companies.css";
import { Link } from "react-router-dom";

const ViewCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(
    (companies) => {
      async function fetchData() {
        await queryAllDocs("companies", companies, setCompanies);

        setDataFetched(true);
      }
      if (!dataFetched) {
        fetchData();
      }
    },
    [dataFetched]
  );
  let count = 0;
  console.log(companies);
  return (
    <>
      <div>ViewCompanies</div>

      <div className='container'>
        {companies.map((companiesData) => {
          count++;
          return (
            <div className='card' key={companiesData.id}>
              <div className='box'>
                <div className='content'>
                  <h2>{count}</h2>
                  <h3>{companiesData.companyName}</h3>
                  <p>
                    Contact Name: {companiesData.contactName} <br />
                    Phone: {companiesData.contactPhoneNumber}
                  </p>
                  <p>Invite Code: {companiesData.companyInvite}</p>
                  <Link to={"/editCompany/" + companiesData.id}>
                    Edit Contact
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewCompanies;
