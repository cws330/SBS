import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyData, userData } from "../../context/commonConst";
import { db } from "../../firebaseConfig";

const AddDeposit = () => {
  const navigate = useNavigate();
  const [userLocationRef, setUserLocationRef] = useState("");
  const [drawerData, setDrawerData] = useState([]);
  const [enteredDepositAmount, setEnteredDepositAmount] = useState(0);

  useEffect(() => {
    const getUserProfileFunction = async () => {
      const userProfileRef = doc(
        db,
        `companies/${companyData}/users/${userData.uid}`
      );
      const docSnap = await getDoc(userProfileRef);
      if (docSnap.exists()) {
        setUserLocationRef(docSnap.data().locationRef);
      }
    };
    getUserProfileFunction();
    const getDrawerCountsFunction = async () => {
      const q = query(
        collection(db, `companies/${companyData}/drawerCounts`),
        where("locationRef", "==", userLocationRef)
      );

      const snapShot = await getDocs(q);
      snapShot.forEach((doc) => {
        const time = doc.data().timestamp;
        const date = time.toDate();
        const shortDate = date.toDateString();
        // const shortTime = date.toLocaleTimeString();
        // Do something with dates...
        const todayDate = new Date();
        const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
        const month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const day = weekday[todayDate.getDay()];
        const getTodayDate =
          day +
          " " +
          month[todayDate.getMonth()] +
          " " +
          todayDate.getDate() +
          " " +
          todayDate.getFullYear();
        if (shortDate === getTodayDate) {
          setDrawerData((drawerData) => [
            ...drawerData,
            { id: doc.id, ...doc.data() },
          ]);
        }
      });
    };
    getDrawerCountsFunction();
  }, [userLocationRef]);
  let activeCount = 0;

  const submitDeposit = async (e) => {
    e.preventDefault();
    console.log(enteredDepositAmount);
    const objectToSubmit = {
      user: userData.uid,
      locationRef: userLocationRef,
      expectedDeposit: activeCount,
      depositAmount: Number(enteredDepositAmount),
      timestamp: serverTimestamp(),
    };
    if (userLocationRef !== undefined) {
      const docRef = await addDoc(
        collection(db, `companies/${companyData}/deposit`),
        objectToSubmit
      );

      alert("Deposit Added");
      navigate("/");
      console.log(docRef.id);
    }
  };
  return (
    <>
      <div>
        <h1>{userLocationRef}</h1>
      </div>
      <div>
        {drawerData.map((drawer) => {
          activeCount += Number(drawer.depositAmount);
          return null;
        })}

        <h2>Expected Deposit Amount:$ {activeCount}</h2>
      </div>
      <div>
        <form onSubmit={submitDeposit}>
          <div className='form-group'>
            Enter Deposit
            <input
              type='number'
              className='form-control'
              id='deposit'
              name='deposit'
              placeholder='Enter Deposit'
              step='any'
              value={Number(enteredDepositAmount) || ""}
              onChange={(e) => {
                setEnteredDepositAmount(e.target.value);
              }}
              required
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='form-control'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDeposit;
