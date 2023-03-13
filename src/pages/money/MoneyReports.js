import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { queryAllDocsForDrawers } from "../../components/CRUD";
import { companyData, userData } from "../../context/commonConst";
import { db } from "../../firebaseConfig";
import "../money/money.css";

const MoneyReports = () => {
  const [userLevel, setUserLevel] = useState(0);
  const [userLocationRef, setUserLocationRef] = useState("");
  const [safeCounts, setSafeCounts] = useState([]);
  const [drawerCounts, setDrawerCounts] = useState([]);
  const [deposits, setDeposits] = useState([]);

  useEffect((drawerCounts, userLevel, deposits, safeCounts) => {
    const getUserData = async () => {
      const q = doc(db, `companies/${companyData}/users`, userData.uid);
      const uD = await getDoc(q);
      if (uD.exists()) {
        setUserLevel(uD.data().userLevel);
        setUserLocationRef(uD.data().locationRef);

        await queryAllDocsForDrawers(
          `companies/${companyData}/drawerCounts`,
          drawerCounts,
          setDrawerCounts,
          10
        );
        await queryAllDocsForDrawers(
          `companies/${companyData}/deposit`,
          deposits,
          setDeposits,
          10
        );
        await queryAllDocsForDrawers(
          `companies/${companyData}/safeCounts`,
          safeCounts,
          setSafeCounts,
          10
        );
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getUserData();
  }, []);
  console.log(deposits.length);
  if (userLevel > 3) {
    return (
      <>
        <div>
          <h1>Money Reports</h1>
        </div>
        <div className='drawerCounts'>
          <span>Drawer Counts</span>
          {drawerCounts.map((drawer) => {
            return (
              <div key={drawer.id} className='drawerCountCard color3'>
                <span>Location: {drawer.locationRef}</span>
                <br />
                <span>Cashier: {drawer.cashier}</span>
                <br />
                <span>Over/Short: {drawer.overShort}</span>
                <br />
                <span>Drawer Deposit Amount: {drawer.depositAmount}</span>
              </div>
            );
          })}
        </div>
        <br></br>
        <div className='drawerCounts '>
          <span>Deposits</span>
          {deposits.map((deposits) => {
            return (
              <div key={deposits.id} className='drawerCountCard color1'>
                <span>Location: {deposits.locationRef}</span>
                <br />
                <span>Expected Deposit: {deposits.expectedDeposit}</span>
                <br />
                <span>Actual Deposit Amount: {deposits.depositAmount}</span>
              </div>
            );
          })}
        </div>
        <div className='drawerCounts '>
          <span>Safe Counts</span>
          {safeCounts.map((safeCount) => {
            const time = safeCount.timestamp;
            const date = time.toDate();
            const shortDate = date.toDateString();
            return (
              <div key={safeCount.id} className='drawerCountCard color2'>
                <span>Location: {safeCount.locationRef}</span>
                <br />
                <span>Time: {shortDate}</span>
                <br />
                <span>Safe Amount: {safeCount.totalAmountCounted}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <h1>Money Reports</h1>
        </div>
        <div className='drawerCounts'>
          <span>Drawer Counts</span>
          {drawerCounts.map((drawer) => {
            if (userLocationRef === deposits.locationRef) {
              return (
                <div key={drawer.id} className='drawerCountCard color3'>
                  <span>Location: {drawer.locationRef}</span>
                  <br />
                  <span>Cashier: {drawer.cashier}</span>
                  <br />
                  <span>Over/Short: {drawer.overShort}</span>
                  <br />
                  <span>Drawer Deposit Amount: {drawer.depositAmount}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <br></br>
        <div className='drawerCounts '>
          <span>Deposits</span>
          {deposits.map((deposits) => {
            if (userLocationRef === deposits.locationRef) {
              return (
                <div key={deposits.id} className='drawerCountCard color1'>
                  <span>Location: {deposits.locationRef}</span>
                  <br />
                  <span>Expected Deposit: {deposits.expectedDeposit}</span>
                  <br />
                  <span>Actual Deposit Amount: {deposits.depositAmount}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className='drawerCounts '>
          <span>Safe Counts</span>
          {safeCounts.map((safeCount) => {
            if (userLocationRef === safeCount.locationRef) {
              const time = safeCount.timestamp;
              const date = time.toDate();
              const shortDate = date.toDateString();
              return (
                <div key={safeCount.id} className='drawerCountCard color2'>
                  <span>Location: {safeCount.locationRef}</span>
                  <br />
                  <span>Time: {shortDate}</span>
                  <br />
                  <span>Safe Amount: {safeCount.totalAmountCounted}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </>
    );
  }
};

export default MoneyReports;
