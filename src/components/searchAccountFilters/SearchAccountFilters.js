import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import BankList from "../createAccount/BankList";

const SearchAccountFilters = ({
  handelAllAccounts,
  setSearchBankName,
  searchBankName,
  setOffset,
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handelAllAccounts();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    try {
      setSearchBankName((prev) => "");
      setReset((prev) => !prev);
    } catch (error) {}
  };
  useEffect(() => {
    handleFilters();
  }, [reset]);

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (searchBankName !== "") {
        setDisable((prev) => false);
        return;
      }
      setDisable((prev) => true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    disableHandle();
  }, [searchBankName]);

  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Search By</h4>
          <form
            className="form-inline"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group m-2">
                {/* <BankList/> */}
                <label>Bank Name</label>&nbsp;&nbsp;
                <input
                  style={{ borderRadius: "5px" }}
                  type="text"
                  value={searchBankName}
                  onChange={(e) => {
                    setSearchBankName((prev) => e.target.value);
                  }}
                ></input>
              </div>
  
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group m-2">
                <Button
                  variant="primary"
                  disabled={disable}
                  onClick={handleFilters}
                >
                  Search
                </Button>
              </div>
              <div className="form-group m-2">
                <Button variant="primary" onClick={resetFilters}>
                  reset filter
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchAccountFilters;
