import React, { useEffect, useState } from "react";
import { login as userLogin } from "../../services/user/authorization.js";
import { useNavigate } from "react-router-dom";
import NavbarShared from "../../shared-components/Navbar.js";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError } from "../../error/Errors.js";


const Login = () => {
  const navigate = new useNavigate()
  
const LoggedIn = ()=>{
  if(localStorage.getItem("isAdmin")){
    let check = localStorage.getItem("isAdmin")
    if(Number(check)){
      navigate('/allusers')
    }else{
      navigate('/allcontacts')
    }
  }
}

const handleForgotPassword =()=>{
  try {
    navigate('/forgotpassword')
  } catch (error) {
    MessageError(error.message) 
  }
}
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  const handleMyLogin = async (e) => {
    try {
      setIsLoading(prev=>true)
      e.preventDefault();
      if (username.length === 0) {
        MessageError('invalid username')
        return;
      }
      if (password.length === 0) {
        MessageError('invalid password')
        return

      }
      const response = await userLogin(username, password);
      console.log(response)
      localStorage.setItem("auth", response.headers.auth);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("id", response.data.id);
      if(response.data.isAdmin){
        localStorage.setItem("isAdmin", 1);
      }else{
        localStorage.setItem("isAdmin", 0);
      }
      if(!response?.data.id){
        MessageError('invalid credentials')
        return
      }
      if(response.data.isAdmin){
        navigate(`/allusers/`)
        return
      }
      navigate(`/allaccounts/`)
      return;
      
    } catch (error) {
      console.log(error)
      MessageError(error.response.data.message)
      
      return
    }finally{
      setIsLoading(prev=>false)
    }
  }

  return (
    <>
    <Spinner isLoading={isLoading}/>
    <NavbarShared/>
      <div className="card mx-auto mt-5" style={{ width: "20rem" }}>
        <div className="card-body">
          <h4 className="card-title mt-2">Login</h4>
          <form>
            <div className="form-group mt-2">
              <label>Username</label>
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Username"
              ></input>
            </div>
            <div className="form-group mt-2">
              <label>Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                className="form-control"
                placeholder="Password"
              ></input>
            </div>
            <div>
            <a className="link-primary" onClick={handleForgotPassword}>Forgot Password?</a>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={handleMyLogin}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
