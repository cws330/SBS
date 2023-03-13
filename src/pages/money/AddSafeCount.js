import {
  addDoc,
  collection,
  collectionGroup,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { companyData, userData } from "../../context/commonConst";
import { db } from "../../firebaseConfig";

const AddSafeCount = () => {
  const navigate = useNavigate();
  const [pennies, setPennies] = useState(0);
  const [nickels, setNickels] = useState(0);
  const [dimes, setDimes] = useState(0);
  const [quarters, setQuarters] = useState(0);
  const [penniesLoose, setPenniesLoose] = useState(0);
  const [nickelsLoose, setNickelsLoose] = useState(0);
  const [dimesLoose, setDimesLoose] = useState(0);
  const [quartersLoose, setQuartersLoose] = useState(0);
  const [ones, setOnes] = useState(0);
  const [fives, setFives] = useState(0);
  const [tens, setTens] = useState(0);
  const [twenties, setTwenties] = useState(0);
  const [fifties, setFifties] = useState(0);
  const [hundreds, setHundreds] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const totalAmountCounted =
    pennies * 0.5 +
    nickels * 2 +
    dimes * 5 +
    quarters * 10 +
    penniesLoose * 0.01 +
    nickelsLoose * 0.05 +
    dimesLoose * 0.1 +
    quartersLoose * 0.25 +
    ones * 1 +
    fives * 5 +
    tens * 10 +
    twenties * 20 +
    fifties * 50 +
    hundreds * 100;

  useEffect(() => {
    const q = query(
      collectionGroup(db, "users"),
      where("email", "==", userData.email)
    );
    const fetchData = async () => {
      try {
        const doc = await getDocs(q);
        // Document was found in the cache. If no cached document exists,
        // an error will be returned to the 'catch' block below.
        doc.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          setUserInfo(doc.data().locationRef);
        });
      } catch (e) {
        console.error("Error getting cached document:", e);
      }
    };
    fetchData();

    // doc.data() will be undefined in this case
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objectToSubmit = {
      user: userData.uid,
      locationRef: userInfo,
      totalAmountCounted: Number(totalAmountCounted),
      timestamp: serverTimestamp(),
    };
    if (userInfo !== undefined) {
      const docRef = await addDoc(
        collection(db, `companies/${companyData}/safeCounts`),
        objectToSubmit
      );

      alert("Safe Count Added");
      navigate("/");
      console.log(docRef.id);
    }
  };

  return (
    <form className='cash-drawer-countdown' onSubmit={handleSubmit}>
      <h1>Safe Countdown</h1>

      <h2>Rolls of Coins</h2>
      <div className='form-group'>
        <label htmlFor='pennies'>Pennies:</label>
        <input
          type='number'
          id='pennies'
          value={pennies}
          onChange={(e) => setPennies(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='nickels'>Nickels:</label>
        <input
          type='number'
          id='nickels'
          value={nickels}
          onChange={(e) => setNickels(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='dimes'>Dimes:</label>
        <input
          type='number'
          id='dimes'
          value={dimes}
          onChange={(e) => setDimes(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='quarters'>Quarters:</label>
        <input
          type='number'
          id='quarters'
          value={quarters}
          onChange={(e) => setQuarters(parseInt(e.target.value))}
        />
      </div>
      <h2>Loose Change</h2>
      <div className='form-group'>
        <label htmlFor='pennies-loose'>Pennies:</label>
        <input
          type='number'
          id='pennies-loose'
          value={penniesLoose}
          onChange={(e) => setPenniesLoose(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='nickels-loose'>Nickels:</label>
        <input
          type='number'
          id='nickels-loose'
          value={nickelsLoose}
          onChange={(e) => setNickelsLoose(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='dimes-loose'>Dimes:</label>
        <input
          type='number'
          id='dimes-loose'
          value={dimesLoose}
          onChange={(e) => setDimesLoose(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='quarters-loose'>Quarters:</label>
        <input
          type='number'
          id='quarters-loose'
          value={quartersLoose}
          onChange={(e) => setQuartersLoose(parseInt(e.target.value))}
        />
      </div>
      <h2>Dollar Bills</h2>
      <div className='form-group'>
        <label htmlFor='ones'>Ones:</label>
        <input
          type='number'
          id='ones'
          value={ones}
          onChange={(e) => setOnes(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='fives'>Fives:</label>
        <input
          type='number'
          id='fives'
          value={fives}
          onChange={(e) => setFives(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='tens'>Tens:</label>
        <input
          type='number'
          id='tens'
          value={tens}
          onChange={(e) => setTens(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='twenties'>Twenties:</label>
        <input
          type='number'
          id='twenties'
          value={twenties}
          onChange={(e) => setTwenties(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='fifties'>Fifties:</label>
        <input
          type='number'
          id='fifties'
          value={fifties}
          onChange={(e) => setFifties(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='hundreds'>Hundreds:</label>
        <input
          type='number'
          id='hundreds'
          value={hundreds}
          onChange={(e) => setHundreds(parseInt(e.target.value))}
        />
      </div>
      <div className='form-group'>
        <button
          type='submit'
          className='btn btn-primary'
          //   disabled={isDisabled()}
        >
          Submit
        </button>
      </div>

      <div className='results'>
        <h2>Results</h2>
        <p>Total Amount Counted: ${totalAmountCounted}</p>
      </div>
    </form>
  );
};
export default AddSafeCount;
