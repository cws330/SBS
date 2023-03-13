import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../companies/companies.css";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ReusableForm from "../../components/reusableForm/ReusableForm";
import { companyData, userData } from "../../context/commonConst";

const EditUser = () => {
  const navigate = useNavigate();

  const editContact = [
    {
      type: "contact",
      name: "EmergencyContact",
      label: "Emergency Contact",
      required: false,
    },
  ];
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    const paramID = params.userID;

    async function getData() {
      const q = doc(db, `companies/${companyData}/users`, paramID);

      const querySnapshot = await getDoc(q);
      if (querySnapshot.exists()) {
        setData(querySnapshot.data());
        // console.log("Document data:", querySnapshot.data());
        setDataFetched(true);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
    if (!dataFetched) {
      getData(paramID);
    }
  }, [dataFetched, params]);

  const editCompany = async (inputs) => {
    const q = doc(db, `companies/${companyData}/users/${params.userID}`);
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

  const changeLevel = async (e) => {
    e.preventDefault();
    if (newAdminId !== null) {
      const newAdmin = doc(
        db,
        `companies/${companyData}/users/${params.userID}`
      );
      await updateDoc(newAdmin, {
        admin: false,
        userLevel: Number(newAdminId),
      }).then(alert("user has been updated."));
    }
  };

  return (
    <>
      <div className='editCompanyDiv'>
        <div className='border'>
          <h1>Edit User</h1>

          <div>
            <h4>
              {data.firstName} {data.lastName}
            </h4>
            <h4>{data.locationRef !== "null" && data.locationRef}</h4>
          </div>
          <div className='Address-editCompany'>
            <h4>Address:</h4>
            <span>Street: {data.address}</span>
            <br />
            <span>
              City: {data.city} State: {data.state}
            </span>
            <br />
            <span>Zip: {data.zip}</span>
          </div>
          <div className='current-contact'>
            <h4>Primary Contact</h4>
            <span>Number: {data.phone}</span>
            <br />
            <span>Email: {data.email}</span>
            <br />
          </div>
          <div className='current-contact'>
            <h4>Emergency Contact</h4>
            <span>Name: {data.contactName}</span>
            <br />
            <span>Number: {data.contactPhoneNumber}</span>
            <br />
            <span>Email: {data.contactEmail}</span>
            <br />
          </div>
        </div>
        <div className='assignAdminToCompany border'>
          <h1>Change User Level</h1>
          <form onSubmit={changeLevel}>
            <label htmlFor='changeLevel'>Select Level:</label>
            <select
              id='changeLevel'
              name='changeLevel'
              onChange={handleNewAdminInputChange}
            >
              <option value={null} key='1'></option>
              <option value={Number(2)} key='2'>
                2
              </option>
              <option value={Number(3)} key='3'>
                3
              </option>
            </select>
            <p align='center'>
              <button type='submit'>Save</button>
            </p>
          </form>
          <div align='center'>
            <h3>Current User Level</h3>
            {data.userLevel}
          </div>
        </div>
        <div className='border'>
          <ReusableForm
            formData={[
              {
                type: "number",
                name: "locationRef",
                label: "Branch Location",
                required: false,
              },
            ]}
            onSubmit={editCompany}
            user={userData.uid}
            formName='Branch Location'
          />
        </div>
        <div className='border'>
          <ReusableForm
            formData={editContact}
            onSubmit={editCompany}
            user={userData.uid}
            formName='Edit Emergency Contact'
          />
        </div>
      </div>
    </>
  );
};

export default EditUser;
