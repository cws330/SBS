import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ReusableForm from "../../components/reusableForm/ReusableForm";
import { userData } from "../../context/commonConst";
import { queryAllDocs } from "../../components/CRUD";

const EditCompany = () => {
  const navigate = useNavigate();

  const editContact = [
    {
      type: "contact",
      name: "pContact",
      label: "Primary Contact",
      required: false,
    },
  ];
  const [adminChoises, setAdminChoises] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    const paramID = params.id;
    const getusersforAdmin = async () => {
      setDataFetched(false);
      await queryAllDocs(
        `companies/${paramID}/users`,
        adminChoises,
        setAdminChoises
      ).then(setDataFetched(true));
    };
    async function getData() {
      const q = doc(db, "companies", paramID);

      const querySnapshot = await getDoc(q);
      if (querySnapshot.exists()) {
        setData(querySnapshot.data());
        // console.log("Document data:", querySnapshot.data());
        setDataFetched(true);
        getusersforAdmin();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    if (!dataFetched) {
      getData(paramID);
    }
  }, [dataFetched, params, adminChoises]);

  const editCompany = async (inputs) => {
    const q = doc(db, "companies", `${params.id}`);
    console.log(q);
    await updateDoc(q, inputs).then(
      alert("Document Written"),
      navigate("/viewCompanies")
    );
  };

  //ASSIGN ADMIN FUNCTIONS

  const [newAdminId, setNewAdminId] = useState(null);

  const handleNewAdminInputChange = (e) => {
    setNewAdminId(e.target.value);
    console.log(e.target.value);
  };

  const assignAdmin = async (e) => {
    e.preventDefault();
    console.log(newAdminId);
    if (newAdminId !== null) {
      const newAdmin = doc(db, `companies/${params.id}/users/${newAdminId}`);
      await updateDoc(newAdmin, { admin: true, userLevel: 4 }).then(
        alert("user has been updated.")
      );
    }
  };

  return (
    <>
      <div className='editCompanyDiv'>
        <div className='border'>
          <h1>EditCompany</h1>
          <div>
            <h2>{data.companyName}</h2>
            <h4>Invite Code: {data.companyInvite}</h4>
          </div>
          <div className='Address-editCompany'>
            <h4>Address:</h4>
            <span>Street: {data.street}</span>
            <br />
            <span>
              City: {data.city} State: {data.state}
            </span>
            <br />
            <span>
              Zip: {data.zip} County: {data.county} Country: {data.country}
            </span>
          </div>
          <div className='current-contact'>
            <h4>Primary Contact</h4>
            <span>Name: {data.contactName}</span>
            <br />
            <span>Number: {data.contactPhoneNumber}</span>
            <br />
            <span>Email: {data.contactEmail}</span>
            <br />
          </div>
        </div>
        <div className='assignAdminToCompany border'>
          <h1>Assign Admin</h1>
          <form onSubmit={assignAdmin}>
            <label htmlFor='chooseAdmin'>Select Admin:</label>
            <select
              id='chooseAdmin'
              name='chooseAdmin'
              onChange={handleNewAdminInputChange}
            >
              <option value={null} key='1'></option>
              {adminChoises?.map((usersData) => {
                return (
                  <option value={usersData.id} key={usersData.id}>
                    {usersData.firstName} {usersData.lastName}
                  </option>
                );
              })}
            </select>
            <p align='center'>
              <button type='submit'>Save</button>
            </p>
          </form>
          <div align='center'>
            <h2>Current Admins</h2>
            {adminChoises.map((user) => {
              if (user.userLvl >= 4) {
                return (
                  <p key={user.phone}>
                    {user.firstName} {user.lastName}
                  </p>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className='border'>
          <ReusableForm
            formData={editContact}
            onSubmit={editCompany}
            user={userData.uid}
            formName='Edit Primary Contact'
          />
        </div>
      </div>
    </>
  );
};

export default EditCompany;
