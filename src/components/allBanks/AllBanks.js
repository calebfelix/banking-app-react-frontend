import React, { useEffect, useState } from "react";
import { deleteUser, getUsers, updateUser } from "../../services/user/users";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import NavbarShared from "../../shared-components/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import SearchUserFilters from "../searchUserFilters/SearchUserFilters";
import { useNavigate } from "react-router-dom";
import { MessageError, MessageSuccess } from "../../error/Errors";
import CreateBank from "../createBank/CreateBank";
import SearchBankFilters from "../searchBankFilters/SearchBankFilters";
import { getBanks, updateBank } from "../../services/bank/banks";

const AllBanks = () => {
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
  const [bankName, setBankName] = useState("");
  const [id, setId] = useState("");

  // bank search filters
  const [searchBankName, setSearchBankName] = useState("");
  const [searchAbbrevieation, setSearchAbbrevieation] = useState("");

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const goBack = () => {
    navigate("/allusers");
  };

  const updateSender = async (e) => {
    try {
      if (bankName.length == 0) {
        throw new Error("invalid Bank name");
      }

      let bodyObj = { bankName };
      let response = await updateBank(id, bodyObj);
      if (response.data === "updated bank") {
        MessageSuccess(response.data);
        handleClose();
        handelAllBanks();
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
        handelAllBanks();
      }
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handelAllBanks = async () => {
    try {
      console.log("handelAllBanks");
      setIsLoading((prev) => true);
      console.log(offset);
      let filters;
      filters = {
        limit: limit,
        page: offset,
        bankName: searchBankName,
        abbrevieation: searchAbbrevieation,
      };

      let response = await getBanks(filters);
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
      handelAllBanks();
    }
  }, [limit, offset, isVerifiedUser]);

  const handleUpdate = (d) => {
    try {
      setBankName(d.bankName);
      setId(d.id);
      console.log(d.id)
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
      <CreateBank handelAllBanks={handelAllBanks} />
      <div>
        <Button className="m-3" variant="success" onClick={goBack}>
          Back
        </Button>
      </div>
      <SearchBankFilters
        handelAllBanks={handelAllBanks}
        setSearchBankName={setSearchBankName}
        setSearchAbbrevieation={setSearchAbbrevieation}
        searchBankName={searchBankName}
        searchAbbrevieation={searchAbbrevieation}
        setOffset={setOffset}
      />
      <Table
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleUpdate={handleUpdate}
        isUpdateButton={true}
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Bank</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>Bank Name</label>
            <input
              type="text"
              className="form-control"
              value={bankName}
              onChange={(e) => {
                setBankName(e.target.value);
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

export default AllBanks;
