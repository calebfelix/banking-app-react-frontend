import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const SearchBankFilters = ({
  handelAllBanks,
  setSearchBankName,
  setSearchAbbrevieation,
  searchBankName,
  searchAbbrevieation,
  setOffset,
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handelAllBanks();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    console.log("hit");
    try {
      setSearchBankName((prev) => "");
      setSearchAbbrevieation((prev) => "");
      setReset((prev) => !prev);
    } catch (error) {}
  };

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (searchBankName !== "" || searchAbbrevieation !== "") {
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
  }, [searchBankName, searchAbbrevieation]);

  useEffect(() => {
    handleFilters();
  }, [reset]);

  return (
    <>
      <div className="card mb-4">
        <div className="card-body">
          <h4 className="card-title">Search By</h4>
          <form
            class="form-inline"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group mt-2">
                <label>Bank Name</label>&nbsp;&nbsp;
                <input
                  style={{ borderRadius: "5px" }}
                  type="text"
                  value={searchBankName}
                  onChange={(e) => {
                    setSearchBankName((prev) => e.target.value);
                  }}
                ></input>&nbsp;&nbsp;
              </div>
              <div className="form-group mt-2">
                <label>Abbrevieation</label>&nbsp;&nbsp;
                <input
                  style={{ borderRadius: "5px" }}
                  type="text"
                  value={searchAbbrevieation}
                  onChange={(e) => {
                    setSearchAbbrevieation((prev) => e.target.value);
                  }}
                ></input>&nbsp;&nbsp;
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="form-group mt-2">
                <Button
                  variant="primary"
                  disabled={disable}
                  onClick={handleFilters}
                >
                  Search
                </Button>
              </div>&nbsp;&nbsp;
              <div className="form-group mt-2">
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

export default SearchBankFilters;
