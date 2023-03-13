import React, { useEffect, useState } from "react";
import "./userProfile.css";
import {
  where,
  query,
  getDocs,
  collectionGroup,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import ReusableForm from "../components/reusableForm/ReusableForm";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const [usersID, setUsersID] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const userProfileForm = [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      required: true,
    },
    {
      type: "text",
      name: "locationRef",
      label: "Location Name",
      required: false,
    },
    {
      type: "phone",
      name: "phone",
      label: "Phone",
      required: true,
    },
    {
      type: "address",
      name: "address",
      label: "Address",
      required: false,
    },
  ];

  useEffect((params) => {
    if (params !== undefined) {
      const q = query(
        collectionGroup(db, "users"),
        where("email", "==", params.email)
      );
      const fetchData = async () => {
        try {
          const doc = await getDocs(q);
          // Document was found in the cache. If no cached document exists,
          // an error will be returned to the 'catch' block below.
          doc.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            setUsersID(doc.id);
          });
        } catch (e) {
          console.error("Error getting cached document:", e);
        }
      };
      fetchData();

      // doc.data() will be undefined in this case
    }
  }, []);

  const handleSubmit = async (inputs) => {
    const q = doc(db, `companies/${params.companyID}/users`, `${usersID}`);

    await updateDoc(q, inputs).then(alert("Document Written"), navigate("/"));
    console.log("submitted");
  };
  return (
    <ReusableForm
      formData={userProfileForm}
      onSubmit={handleSubmit}
      user={null}
      formName='Profile'
    />
  );
}

export default UserProfile;
