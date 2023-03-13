import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { createContext, useEffect, useReducer, useState } from "react";
import { db } from "../firebaseConfig";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  currentUser: JSON.parse(sessionStorage.getItem("user")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [company, setCompany] = useState("");

  useEffect(() => {
    //Set UserID to Session
    if (state.currentUser != null) {
      sessionStorage.setItem("user", JSON.stringify(state.currentUser));
    }

    //Set Company to Session
    if (state.currentUser != null) {
      const userEmail = state.currentUser.email;
      const q = query(
        collectionGroup(db, "users"),
        where("email", "==", userEmail)
      );

      const fetchData = async () => {
        try {
          const doc = await getDocs(q);
          // Document was found in the cache. If no cached document exists,
          // an error will be returned to the 'catch' block below.
          doc.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            setCompany(doc.data().companyID);
          });
        } catch (e) {
          console.error("Error getting cached document:", e);
        }

        sessionStorage.setItem("company", company);
      };
      fetchData();

      // doc.data() will be undefined in this case
    }
  }, [state.currentUser, company]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
