import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlipCard from "../components/dashboardFlipCard/FlipCard";
import "./Home.css";
import companies from "../images/building-regular.svg";
import building from "../images/building.svg";
import money from "../images/money.svg";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { companyData, userData } from "../context/commonConst";

function Home() {
  const navigate = useNavigate();
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState({});

  useEffect(
    (navigate) => {
      if (auth.currentUser) {
        async function getData() {
          const q = doc(
            db,
            `companies/${companyData}/users/${auth?.currentUser?.uid}`
          );

          const querySnapshot = await getDoc(q);
          if (querySnapshot.exists()) {
            if (querySnapshot.data().firstName === undefined) {
              navigate(`/userProfile/${companyData}/${userData.email}`);
            } else {
              setData(querySnapshot.data());
            }
            // console.log("Document data:", querySnapshot.data());
            setDataFetched(true);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }
        if (!dataFetched) {
          getData();
        }
      }
    },
    [dataFetched]
  );

  const companiesButtons = [
    {
      label: "New Company",
      onClick: () => navigate("/newCompany"),
    },
    {
      label: "View Companies",
      onClick: () => navigate("/viewCompanies"),
    },
  ];
  const moneyButtons = [
    {
      label: "New Drawer Count",
      onClick: () => navigate("/newDrawerCount"),
    },
    {
      label: "New Deposit",
      onClick: () => navigate("/newDeposit"),
    },
    {
      label: "New Safe Count",
      onClick: () => navigate("/newSafeCount"),
    },
    {
      label: "Reports",
      onClick: () => navigate("/moneyReports"),
    },
  ];
  const companySettingsButtons = [
    {
      label: "Branches",
      onClick: () => navigate("/branches"),
    },
    {
      label: "Users",
      onClick: () => navigate("/users"),
    },
  ];

  return (
    <div className='home'>
      {data.userLevel === Number(5) && (
        <FlipCard
          icon={companies}
          name='Companies'
          buttons={companiesButtons}
        />
      )}

      {data.userLevel >= Number(2) && (
        <FlipCard icon={money} name='Money' buttons={moneyButtons} />
      )}
      {data.userLevel >= Number(4) && (
        <FlipCard
          icon={building}
          name='Company Settings'
          buttons={companySettingsButtons}
        />
      )}
    </div>
  );
}

export default Home;
