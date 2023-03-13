import React from "react";
import ReusableForm from "../../components/reusableForm/ReusableForm";
import { useNavigate } from "react-router-dom";
import { createDoc } from "../../components/CRUD";
import { companyData } from "../../context/commonConst";

function NewBranch() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const newBranchForm = [
    {
      type: "address",
      name: "branchAddress",
      label: "Branch Location",
      required: true,
    },
    {
      type: "text",
      name: "locationRef",
      label: "Location Name",
      required: false,
    },

    {
      type: "contact",
      name: "pContact",
      label: "Primary Contact",
      required: false,
    },
  ];

  // const validate = () => {
  //   let newErrors = {};
  //   if (!companyFormData.companyName) {
  //     newErrors.companyName = "First name is required";
  //   }
  //   if (!companyFormData.primaryContact) {
  //     newErrors.primaryContact = "Last name is required";
  //   }
  //   if (!companyFormData.phone) {
  //     newErrors.phone = "Phone number is required";
  //   }
  //   if (!companyFormData.email) {
  //     newErrors.email = "Email is required";
  //   }
  //   if (!companyFormData.address) {
  //     newErrors.address = "Address is required";
  //   }
  //   if (!companyFormData.city) {
  //     newErrors.city = "City is required";
  //   }
  //   if (!companyFormData.state) {
  //     newErrors.state = "State is required";
  //   }
  //   if (!companyFormData.zip) {
  //     newErrors.zip = "Zip code is required";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const insertNewBranch = async (inputs) => {
    console.log(inputs);
    await createDoc(inputs, `companies/${companyData}/branches`).then(
      alert("Document Written"),
      navigate("/")
    );
  };

  return (
    <>
      <ReusableForm
        formData={newBranchForm}
        onSubmit={insertNewBranch}
        user={userData.uid}
        formName='New Branch'
      />
    </>
  );
}

export default NewBranch;
