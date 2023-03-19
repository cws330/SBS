import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthContext } from "./context/AuthContext";
import UserProfile from "./pages/UserProfile";
import NewCompany from "./pages/companies/NewCompany";
import Navigation from "./components/Navigation/Navigation";
import ViewCompanies from "./pages/companies/ViewCompanies";
import EditCompany from "./pages/companies/EditCompany";
import Logout from "./pages/Logout";
import { CheckUserLevel } from "./context/commonConst";
import NotAuthorized from "./pages/NotAuthorized";
import ViewBranches from "./pages/branches/ViewBranches";
import NewBranch from "./pages/branches/NewBranch";
import EditBranch from "./pages/branches/EditBranch";
import ViewUsers from "./pages/users/ViewUsers";
import EditUser from "./pages/users/EditUser";
import AddDrawerCount from "./pages/money/AddDrawerCount";
import AddSafeCount from "./pages/money/AddSafeCount";
import AddDeposit from "./pages/money/AddDepositCount";
import MoneyReports from "./pages/money/MoneyReports";
import { auth } from "./firebaseConfig";

function App() {
  const { currentUser } = useContext(AuthContext);
  const RequireAuth = ({ children, userLevel }) => {
    return currentUser ? userLevel() && children : <Navigate to='/login' />;
  };

  return (
    <div className='App'>
      {currentUser != null && <Navigation />}

      <Routes>
        <Route
          exact
          path='/'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(2)}>
              <Home usersInfo={auth.currentUser} />
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/notAuthorized' element={<NotAuthorized />} />
        <Route
          path='/newCompany'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(5)}>
              <NewCompany />
            </RequireAuth>
          }
        />
        <Route
          path='/viewCompanies'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(5)}>
              <ViewCompanies />
            </RequireAuth>
          }
        />
        <Route
          path='/editCompany/:id'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(4)}>
              <EditCompany />
            </RequireAuth>
          }
        />
        <Route
          path='/branches'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(4)}>
              <ViewBranches />
            </RequireAuth>
          }
        />
        <Route
          path='/editBranch/:branchID'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(4)}>
              <EditBranch />
            </RequireAuth>
          }
        />
        <Route
          path='/branches/addBranch/:companyID'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(4)}>
              <NewBranch />
            </RequireAuth>
          }
        />
        <Route
          path='/users'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(4)}>
              <ViewUsers />
            </RequireAuth>
          }
        />
        <Route
          path='/editUser/:userID'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(4)}>
              <EditUser />
            </RequireAuth>
          }
        />
        <Route
          path='/newDrawerCount'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(2)}>
              <AddDrawerCount />
            </RequireAuth>
          }
        />
        <Route
          path='/newDeposit'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(2)}>
              <AddDeposit />
            </RequireAuth>
          }
        />
        <Route
          path='/moneyReports'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(3)}>
              <MoneyReports />
            </RequireAuth>
          }
        />
        <Route
          path='/newSafeCount'
          element={
            <RequireAuth userLevel={() => CheckUserLevel(2)}>
              <AddSafeCount />
            </RequireAuth>
          }
        />
        <Route
          path='/userProfile/:companyID/:email'
          element={<UserProfile />}
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />{" "}
      </Routes>
      {/* other components */}
    </div>
  );
}

export default App;
