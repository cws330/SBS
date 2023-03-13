import { signOut } from "firebase/auth";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebaseConfig";

const Logout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    logout();
  });
  const logout = async () => {
    dispatch({ type: "LOGOUT", payload: null });
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
    // sessionStorage.setItem("user", null);
    sessionStorage.clear();
    navigate("/login");
  };
};

export default Logout;
