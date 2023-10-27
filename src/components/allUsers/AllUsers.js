import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../../services/user/users";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import NavbarShared from "../../shared-components/Navbar";
import CreateUser from "../createUser/CreateUser";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import SearchUserFilters from "../searchUserFilters/SearchUserFilters";
import { useNavigate } from "react-router-dom";
import { MessageError, MessageSuccess } from "../../error/Errors";

const AllUsers = () => {
  // user states
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // modal states
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");

  // User search filters
  const [searchName, setSearchName] = useState("");
  const [searchAge, setSearchAge] = useState(0);
  const [searchGender, setSearchGender] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchIsAdmin, setSearchIsAdmin] = useState(false);

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const addBankHandle = () => {
    navigate("/allbanks");
  };

  const updateSender = async (e) => {
    try {
      if (name.length == 0) {
        throw new Error("invalid name");
      }
      if (age.length == 0) {
        throw new Error("invalid age");
      }
      console.log(gender)
      if (gender.length == 0) {
        throw new Error("invalid gender");
      }
      if (email.length == 0) {
        throw new Error("invalid email");
      }

      let bodyObj = { name, age, gender, email };
      let response = await updateUser(id, bodyObj);
      console.log(response.data)
      if (response.data === "user Updated") {
        MessageSuccess(response.data);
        handleClose();
        handelAllUsers();
      }
    } catch (error) {
      if (error.response) {
        MessageError(error.response.data.message);
      } else {
        MessageError(error.message);
      }
    }
  };

  const handleDelete = async (d) => {
    try {
      let response = await deleteUser(d.id);
      if (response.data === "user Deleted") {
        MessageSuccess(response.data);
        handelAllUsers();
      }
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handelAllUsers = async () => {
    try {
      console.log("handelAllUsers");
      setIsLoading((prev) => true);
      console.log(offset);
      let filters;
      if (searchAge == 0) {
        filters = {
          limit: limit,
          page: offset,
          name: searchName,
          username: searchUsername,
          isAdmin: searchIsAdmin,
          email: searchEmail,
        };
      } else {
        filters = {
          limit: limit,
          page: offset,
          name: searchName,
          age: searchAge,
          username: searchUsername,
          isAdmin: searchIsAdmin,
          email: searchEmail,
        };
      }

      let response = await getUsers(filters);
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      console.log(error);
      MessageError(error.response.data.message, { variant: "error" });
    } finally {
      setIsLoading((prev) => false);
    }
  };

  const verifyUser = async () => {
    try {
      let response = await verify();
      setIsVerifiedUser((prev) => response.data.result);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handelAllUsers();
    }
  }, [limit, offset, isVerifiedUser]);

  const handleUpdate = (d) => {
    try {
      setName(d.name);
      setAge(d.age);
      setEmail(d.email);
      setId(d.id);
      setGender(d.gender);
      setShow((prev) => true);
    } catch (error) {
      MessageError("couldnt set values");
    }
  };

  if (!isVerifiedUser) {
    return (
      <h1>
        <a href="/">please login</a>
      </h1>
    );
  }
  return (
    <>
      <Spinner isLoading={isLoading} />
      <NavbarShared />
      <CreateUser handelAllUsers={handelAllUsers} />
      <div>
        <Button className="m-3" variant="success" onClick={addBankHandle}>
          + Add Bank
        </Button>
      </div>
      <SearchUserFilters
        handelAllUsers={handelAllUsers}
        setSearchName={setSearchName}
        setSearchAge={setSearchAge}
        setSearchGender={setSearchGender}
        setSearchUsername={setSearchUsername}
        setSearchEmail={setSearchEmail}
        setSearchIsAdmin={setSearchIsAdmin}
        searchName={searchName}
        searchAge={searchAge}
        searchGender={searchGender}
        searchUsername={searchUsername}
        searchEmail={searchEmail}
        searchIsAdmin={searchIsAdmin}
        setOffset={setOffset}
      />
      <Table
        rows={data}
        setOffset={setOffset}setGender
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        isUpdateButton={true}
        isDeleteButton={true}
        isViewButton={false}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label>Age</label>
            <input
              type="text"
              className="form-control"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            ></input>
          </div>
          <div className="form-group mt-2">
            <label>Gender</label>
            <select
              className="custom-select form-control"
              style={{ borderRadius: "5px" }}
              onChange={(e) => {
                setGender((prev) => e.target.value);
              }}
            >
              <option value="" selected={gender == ""}>
                select
              </option>
              <option value="male" selected={gender == "male"}>male</option>
              <option value="female" selected={gender == "female"}>female</option>
              <option value="others" selected={gender == "others"}>others</option>
            </select>
          </div>
          <div className="form-group mt-2">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateSender}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllUsers;
