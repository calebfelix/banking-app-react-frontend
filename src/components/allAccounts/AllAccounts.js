import React, { useEffect, useState } from "react";
import NavbarShared from "../../shared-components/Navbar";
import Table from "../../shared-components/Table";
import { verify } from "../../services/user/authorization";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Spinner from "../../shared-components/Spinner/Spinner.js";
import { MessageError, MessageSuccess } from "../../error/Errors";
import { getAccounts } from "../../services/account/accounts";
import SearchAccountFilters from "../searchAccountFilters/SearchAccountFilters";
import CreateAccount from "../createAccount/CreateAccount";
import {
  deposite,
  transfer,
  withdraw,
} from "../../services/transaction/transactions";
import TransferDropdown from "../transferDropdown/TransferDropdown";
import { getUserNetWorth } from "../../services/user/users";

const AllAccounts = () => {
  const navigate = useNavigate();
  const [netWorth, setNetWorth] = useState(0);
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [noOfPages, setNoOfPages] = useState(1);
  const [offset, setOffset] = useState(1);
  const [isVerifiedUser, setIsVerifiedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // modals
  const [show, setShow] = useState(false);
  const [showDeposite, setShowDeposite] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  // amounts
  const [depositeAmount, setDepositeAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferToAccount, setTransferToAccount] = useState("");

  // modal states
  const [id, setId] = useState("");
  const [book, setBook] = useState({});

  // search filters
  const [searchBankName, setSearchBankName] = useState("");

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  let userId = localStorage.getItem("id");

  const viewPassbook = (d) => {
    setId(d.id);
    console.log(data);
    setBook(d);
    setShow((prev) => true);
  };

  const getNetWorth = async () => {
    try {
      let response = await getUserNetWorth(userId);
      setNetWorth(response.data[0].net_worth);
      // setNetWorth()
    } catch (error) {
      MessageError(error.message);
    }
  };

  const depositeSend = async (d) => {
    try {
      if (depositeAmount == 0) {
        throw new Error("invalid deposite amount");
      }
      if (depositeAmount > 100000) {
        throw new Error("deposite amount crossing limit");
      }
      let userId = localStorage.getItem("id");
      let body = { amount: Number(depositeAmount) };

      let response = await deposite(userId, id, body);
      console.log(response);
      if (response.data) {
        MessageSuccess("Amount added");
      }
      handelAllAccounts();
      setShowDeposite((prev) => !prev);
    } catch (error) {
      console.log(error);
      MessageError(error.message);
    }
  };

  const withdrawSend = async (d) => {
    try {
      if (withdrawAmount == 0) {
        throw new Error("invalid withdraw amount");
      }
      let userId = localStorage.getItem("id");
      let body = { amount: Number(withdrawAmount) };

      let response = await withdraw(userId, id, body);
      console.log(response);
      if (response.data) {
        MessageSuccess("Amount deducted");
      }
      handelAllAccounts();
      setShowWithdraw((prev) => !prev);
    } catch (error) {
      console.log(error);
      MessageError(error.message);
    }
  };

  const transferSend = async (d) => {
    try {
      if (transferToAccount.length == 0) {
        throw new Error("invalid To Account");
      }
      if (transferAmount == 0) {
        throw new Error("invalid Transfer amount");
      }
      if (transferAmount > 100000) {
        throw new Error("transfer amount crossing limit");
      }
      let userId = localStorage.getItem("id");
      let body = {
        amount: Number(transferAmount),
        recieverAccountId: transferToAccount,
      };

      let response = await transfer(userId, id, body);
      if (response.data) {
        MessageSuccess("Amount sent");
      }
      handelAllAccounts();
      setShowTransfer((prev) => !prev);
    } catch (error) {
      console.log(error);
      MessageError(error.message);
    }
  };

  const handleDeposite = async (d) => {
    try {
      setShowDeposite((prev) => !prev);
      setId(d.id);
      console.log("deposite");
    } catch (error) {
      MessageError(error.message);
    }
  };

  const handleWithdraw = async (d) => {
    try {
      setShowWithdraw((prev) => !prev);
      setId(d.id);
      console.log("withdraw");
    } catch (error) {
      MessageError(error.message);
    }
  };

  const handleTransfer = async (d) => {
    try {
      setShowTransfer((prev) => !prev);
      setId(d.id);
      console.log("transfer");
    } catch (error) {
      MessageError(error.response.data.message);
    }
  };

  const handleView = async (d) => {
    try {
      console.log("d>>>>>>>>>>>>>>>>>>>>>>", d);
      navigate(`/passbook/${d.id}`);
    } catch (error) {
      MessageError("could not redirect");
    } finally {
    }
  };

  const handelAllAccounts = async (e) => {
    try {
      setIsLoading((prev) => true);
      let filters = {
        limit: limit,
        page: offset,
        bankName: searchBankName,
      };
      let response = await getAccounts(userId, filters);
      console.log(response);
      setCount((prev) => response?.headers["x-total-count"]);
      let noOfPages = Math.ceil(response?.headers["x-total-count"] / limit);
      setNoOfPages(noOfPages);
      setData((prev) => response.data);
      return;
    } catch (error) {
      MessageError(error.response.data.message);
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
    getNetWorth();
  }, [handelAllAccounts]);

  useEffect(() => {
    verifyUser();
  }, []);

  useEffect(() => {
    if (isVerifiedUser) {
      handelAllAccounts();
    }
  }, [limit, offset, isVerifiedUser]);

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
      <div style={{ display: "flex" }}>
        <CreateAccount handelAllAccounts={handelAllAccounts} />
        <div className="m-5">
          <h1>Networth : {netWorth}</h1>
        </div>
      </div>
      <SearchAccountFilters
        handelAllAccounts={handelAllAccounts}
        setSearchBankName={setSearchBankName}
        searchBankName={searchBankName}
        setOffset={setOffset}
      />
      <Table
        rows={data}
        setOffset={setOffset}
        setLimit={setLimit}
        limit={limit}
        offset={offset}
        count={count}
        handleDeposite={handleDeposite}
        handleWithdraw={handleWithdraw}
        handleTransfer={handleTransfer}
        handleView={handleView}
        isDeposite={true}
        isWithdraw={true}
        isTransfer={true}
        isViewButton={true}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Passbook</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(book, null, 2)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDeposite}
        onHide={(e) => {
          setShowDeposite((prev) => !prev);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deposite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setDepositeAmount(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              setShowDeposite((prev) => !prev);
            }}
          >
            Close
          </Button>
          <Button variant="success" onClick={depositeSend}>
            Deposite
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showWithdraw}
        onHide={(e) => {
          setShowWithdraw((prev) => !prev);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Withdraw</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setWithdrawAmount(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              setShowWithdraw((prev) => !prev);
            }}
          >
            Close
          </Button>
          <Button variant="danger" onClick={withdrawSend}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showTransfer}
        onHide={(e) => {
          setShowTransfer((prev) => !prev);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransferDropdown setTransferToAccount={setTransferToAccount} />
          {/* <div className="form-group mt-2">
            <label>To Account</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setTransferToAccount(e.target.value);
              }}
            ></input>
          </div> */}
          <div className="form-group mt-2">
            <label>Amount</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setTransferAmount(e.target.value);
              }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => {
              setShowTransfer((prev) => !prev);
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={transferSend}>
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllAccounts;
