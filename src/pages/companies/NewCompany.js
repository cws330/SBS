import React from "react";
import ReusableForm from "../../components/reusableForm/ReusableForm";
import { useNavigate } from "react-router-dom";
import { createDoc } from "../../components/CRUD";

function NewCompany() {
  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const newCompanyForm = [
    {
      type: "text",
      name: "companyName",
      label: "Company Name",
      required: false,
    },
    {
      type: "text",
      name: "companyInvite",
      label: "Company Invite Code",
      required: false,
    },
    {
      type: "text",
      name: "companyLevel",
      label: "Company Level",
      required: false,
    },
    {
      type: "contact",
      name: "pContact",
      label: "Primary Contact",
      required: false,
    },

    { type: "address", name: "address", label: "Address", required: false },
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

  const newCompany = async (inputs) => {
    console.log(inputs);
    await createDoc(inputs, "companies").then(
      alert("Document Written"),
      navigate("/")
    );
  };

  return (
    <>
      <ReusableForm
        formData={newCompanyForm}
        onSubmit={newCompany}
        user={userData.uid}
        formName='New Company'
      />
    </>
  );
}

export default NewCompany;
