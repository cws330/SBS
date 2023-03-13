import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ReusableForm from "../../components/reusableForm/ReusableForm";
import { companyData, userData } from "../../context/commonConst";

const EditBranch = () => {
  const navigate = useNavigate();

  const editContact = [
    {
      type: "contact",
      name: "pContact",
      label: "Primary Contact",
      required: false,
    },
  ];
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState({});
  const params = useParams();
  useEffect(() => {
    const paramID = params.branchID;

    async function getData() {
      const q = doc(db, `companies/${companyData}/branches/${paramID}`);

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

  const editBranchContact = async (inputs) => {
    const q = doc(db, `companies/${companyData}/branches/${params.branchID}`);
    console.log(q);
    await updateDoc(q, inputs).then(
      alert("Document Written"),
      navigate("/branches")
    );
  };

  return (
    <>
      <div className='editCompanyDiv'>
        <div className='border'>
          <h1>Edit Branch</h1>
          <div>
            <h2>{data.companyName}</h2>
            <h4 style={{ textTransform: "uppercase" }}>{data.locationRef}</h4>
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

        <div className='border'>
          <ReusableForm
            formData={editContact}
            onSubmit={editBranchContact}
            user={userData.uid}
            formName='Edit Primary Contact'
          />
        </div>
      </div>
    </>
  );
};

export default EditBranch;
