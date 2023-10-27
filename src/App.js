import "./App.css";
import Login from "./components/login/Login";
import AllUsers from "./components/allUsers/AllUsers.js";
import { Navigate, Route, Routes } from "react-router-dom";
import AllBanks from "./components/allBanks/AllBanks";
import AllAccounts from "./components/allAccounts/AllAccounts";
import Passbook from "./components/passbook/Passbook";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";

function App() {
  
  return (
    <>
      <Routes>
        <Route exact path={`/`} element={<Login/>}/>
        <Route exact path={`/allusers`} element={<AllUsers />} />
        <Route exact path={`/allaccounts`} element={<AllAccounts />} />
        <Route exact path={`/allbanks`} element={<AllBanks />} />
        <Route exact path={`/passbook/:accountId`} element={<Passbook />}/>
        <Route exact path={`/forgotpassword`} element={<ForgotPassword/>}/>
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
