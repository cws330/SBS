import React, { useEffect } from "react";
import { queryAllDocs } from "../../components/CRUD";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { companyData } from "../../context/commonConst";

const ViewBranches = () => {
  const [branches, setbranches] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  const addBranch = () => {
    navigate(`addBranch/${companyData}`);
  };

  useEffect(
    (branches) => {
      async function fetchData() {
        await queryAllDocs(
          `companies/${companyData}/branches`,
          branches,
          setbranches
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
      <p>
        {" "}
        <button onClick={addBranch}>Add Branch</button>
      </p>
      <div>View Branches</div>

      <div className='container'>
        {branches.length === 0 && (
          <div>
            <h2>No branches currently setup</h2>
          </div>
        )}
        {branches.length > 0 &&
          branches.map((branchData) => {
            count++;
            return (
              <div className='card' key={branchData.id}>
                <div className='box'>
                  <div className='content'>
                    <h2>{count}</h2>
                    <h3>{branchData.locationRef}</h3>
                    <p>
                      Contact Name: {branchData.contactName} <br />
                      Phone: {branchData.contactPhoneNumber}
                    </p>

                    <Link to={"/editBranch/" + branchData.id}>Edit Branch</Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ViewBranches;
