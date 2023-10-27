import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchPassbookFilters = ({
  handlePassbook,
  setFromDate,
  setToDate,
  fromDate,
  toDate,
  setOffset,
}) => {
  const handleFilters = () => {
    try {
      setOffset((prev) => 1);
      console.log("first");
      handlePassbook();
    } catch (error) {}
  };
  const [reset, setReset] = useState(false);
  const resetFilters = (e) => {
    console.log("hit");
    try {
      setFromDate((prev) => new Date("2000/01/01"));
      setToDate((prev) => new Date());
      setReset((prev) => !prev);
    } catch (error) {}
  };

  const [disable, setDisable] = useState(false);
  const disableHandle = () => {
    try {
      if (toDate !== "" || fromDate !== "") {
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
  }, [toDate, fromDate]);

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
              {/* <div className="form-group mt-2">
                <label>From date</label>&nbsp;&nbsp;
                <input
                  style={{ borderRadius: "5px" }}
                  type="text"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate((prev) => e.target.value);
                  }}
                ></input>&nbsp;&nbsp;
              </div>
              <div className="form-group mt-2">
                <label>To date</label>&nbsp;&nbsp;
                <input
                  style={{ borderRadius: "5px" }}
                  type="text"
                  value={toDate}
                  onChange={(e) => {
                    setToDate((prev) => e.target.value);
                  }}
                ></input>&nbsp;&nbsp;
              </div> */}
              <div className="form-group mt-2">
                <label>From date</label>&nbsp;&nbsp;
                <DatePicker
                dateFormat='yyyy/MM/dd'
                  selected={fromDate}
                  onChange={(date) => setFromDate(date)}
                />
                &nbsp;&nbsp;
              </div>
              <div className="form-group mt-2">
                <label>To date</label>&nbsp;&nbsp;
                <DatePicker
                dateFormat='yyyy/MM/dd'
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                />
                &nbsp;&nbsp;
              </div>

              {/* <DatePicker selected={fromDate} onChange={(date) => setFromDate(date)}/>
              <DatePicker selected={toDate} onChange={(date) => setToDate(date)}/> */}
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
              </div>
              &nbsp;&nbsp;
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

export default SearchPassbookFilters;
