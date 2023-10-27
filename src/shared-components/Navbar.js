import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { logout } from "../services/user/logout";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { resetPassword } from "../services/user/users";
import { MessageError, MessageSuccess } from "../error/Errors";

const NavbarShared = () => {
  const navigate = new useNavigate();
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClose = () => {
    setCurrentPassword((prev) => "")
    setNewPassword((prev) => "")
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const resetPasswordSender = async (e) => {
    try {
      if(currentPassword.length == 0){
        throw new Error("invalid current Password")
      }
      if(newPassword.length == 0){
        throw new Error("invalid new Password")
      }

      let sendObj = { currentPassword, newPassword, username:localStorage.getItem("username") }
      console.log(sendObj);
      let response = await resetPassword(sendObj)
      if (response.data === "updated password") {
        MessageSuccess(response.data);
        handleClose();
      }
    } catch (error) {
      if(error.response){
        if(error.response.data?.message=="authentication failed"){
          MessageError("Incorrect Current Password");
          return
        }
        MessageError(error.response.data.message);
      }else{
        MessageError(error.message);
      }
    }

  };

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      handleShow();
    } catch (error) {
      MessageError(error.message)
    }

  };

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      let response = await logout();
      localStorage.clear();
      navigate(`/`);
    } catch (error) {
      console.log(error)
      MessageError(error.response.data.message)
    }

  };
  if (!localStorage.getItem("username")) {
    return (
      <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container style={{ justifyContent: "space-around" }}>
          <Navbar.Brand>Banking App</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>Current Password</label>
            <input
              type="text"
              className="form-control"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label>New Password</label>
            <input
              type="text"
              className="form-control"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={resetPasswordSender}>
            Reset
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Text>Hello! {localStorage.getItem("username")}</Navbar.Text>
          <Navbar.Brand>Banking App</Navbar.Brand>
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              style={{ marginRight: "20px" }}
              onClick={handleResetPassword}
            >
              Reset Password
            </Button>
            <Button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              logout
            </Button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarShared;
