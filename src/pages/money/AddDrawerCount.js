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

const AddDrawerCount = ({ totalCashSales }) => {
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
  const [drawerNumber, setDrawerNumber] = useState(0);
  const [cashier, setCashier] = useState("");
  const [paidOuts, setPaidOuts] = useState(0);
  const [paidIns, setPaindIns] = useState(0);
  const [cashSalesAmount, setCashSalesAmount] = useState(0);
  const [userInfo, setUserInfo] = useState("");
  const startingDrawerAmount = Number(150);
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

  const difference =
    Number(totalAmountCounted) -
    Number(paidOuts) -
    (Number(startingDrawerAmount) + Number(cashSalesAmount) + Number(paidIns));
  const depositAmount = () => {
    if (difference > 0) {
      return (
        Number(totalAmountCounted) -
        Number(startingDrawerAmount) +
        Number(difference)
      );
    } else if (difference < 0) {
      return totalAmountCounted - startingDrawerAmount;
    } else {
      return totalAmountCounted - startingDrawerAmount;
    }
  };

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
      cashier,
      cashSalesAmount: Number(cashSalesAmount),
      drawerNumber: Number(drawerNumber),
      totalAmountCounted: Number(totalAmountCounted),
      overShort: Number(difference.toFixed(2)),
      depositAmount: Number(depositAmount().toFixed(2)),
      timestamp: serverTimestamp(),
    };
    if (userInfo !== undefined) {
      const docRef = await addDoc(
        collection(db, `companies/${companyData}/drawerCounts`),
        objectToSubmit
      );

      alert("Drawer Count Added");
      navigate("/");
      console.log(docRef.id);
    }
  };

  return (
    <form className='cash-drawer-countdown' onSubmit={handleSubmit}>
      <h1>Cash Drawer Countdown</h1>

      <div className='form-group'>
        <label htmlFor='total-cash-sales'>Total Cash Sales:</label>
        <input
          type='currency'
          id='total-cash-sales'
          value={totalCashSales}
          onChange={(e) => {
            setCashSalesAmount(e.target.value);
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='cashier'>Cashier:</label>
        <input
          type='text'
          id='cashier'
          value={cashier}
          onChange={(e) => {
            setCashier(e.target.value);
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='drawerNumber'>Drawer Number:</label>
        <input
          type='number'
          id='drawerNumber'
          value={drawerNumber}
          step='1'
          max='6'
          onChange={(e) => {
            setDrawerNumber(e.target.value);
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='paidIns'>Paid In:</label>
        <input
          type='currency'
          id='paidIns'
          value={paidIns}
          step='any'
          min='0'
          onChange={(e) => {
            setPaindIns(e.target.value);
          }}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='paidOuts'>Paid Out:</label>
        <input
          type='currency'
          id='paidOuts'
          value={paidOuts}
          step='any'
          min='0'
          onChange={(e) => {
            setPaidOuts(e.target.value);
          }}
        />
      </div>
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
        <p>Starting Drawer Amount: ${startingDrawerAmount}</p>
        <p>Cash Sales Amount: ${cashSalesAmount}</p>
        <p>Total Amount Counted: ${totalAmountCounted}</p>
        <p>Drawer Over/Short: ${Number(difference).toFixed(2)}</p>
        <p>Expected For Deposit: ${depositAmount().toFixed(2)}</p>
      </div>
    </form>
  );
};
export default AddDrawerCount;
