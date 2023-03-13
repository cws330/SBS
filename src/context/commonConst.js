import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";

export const userData = JSON.parse(sessionStorage.getItem("user"));
export const companyData = sessionStorage.getItem("company");

export const CheckUserLevel = async (requiredLevel) => {
  const navigate = useNavigate();
  const q = doc(db, `companies/${companyData}/users`, userData.uid);

  const querySnapshot = await getDoc(q);
  if (querySnapshot.exists()) {
    if (querySnapshot.data().userLevel < requiredLevel) {
      navigate("/notAuthorized");
    }
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
