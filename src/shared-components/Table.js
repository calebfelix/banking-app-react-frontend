import React, { useState } from "react";
import PaginationShared from "./PaginationShared";
import RowButtons from "./RowButtons";
import Spinner from "./Spinner/Spinner";

const Table = ({
  rows,
  setLimit,
  setOffset,
  limit,
  offset,
  count,
  handleUpdate,
  handleDelete,
  handleView,
  isUpdateButton,
  isDeleteButton,
  isViewButton,
  hasNoButtons,
  isDeposite,
  isWithdraw,
  isTransfer,
  handleDeposite,
  handleWithdraw,
  handleTransfer,
}) => {
  let headerForTable;
  let dataForTable;

  if (rows.length !== 0) {
    let keysArray = Object.keys(rows[0]);
    if(!hasNoButtons){
      keysArray.push("Edit");
    }
    let dataArray = Object.values(rows);

    headerForTable = keysArray.map((key) => {
      return <th key={Math.random()}>{key}</th>;
    });

    dataForTable = dataArray.map((d) => {
      return (
        <tr key={Math.random()}>
          {keysArray.map((key) => {
            if (d[key] === true) {
              return <td key={Math.random()}>True</td>;
            }
            if (d[key] === false) {
              return <td key={Math.random()}>False</td>;
            }
            if (key == "Edit") {
              return (
                <td key={Math.random()}>
                  <RowButtons
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleView={handleView}
                    itemData={d}
                    isDeleteButton={isDeleteButton}
                    isUpdateButton={isUpdateButton}
                    isViewButton={isViewButton}
                    isDeposite={isDeposite}
                    isWithdraw={isWithdraw}
                    isTransfer={isTransfer}
                    handleDeposite={handleDeposite}
                    handleWithdraw={handleWithdraw}
                    handleTransfer={handleTransfer}
                  />
                </td>
              );
            }
            return <td key={Math.random()}>{d[key]}</td>;
          })}
        </tr>
      );
    });
  }

  if (rows.length == 0) {
    return (
      <>
        <div style={{ marginLeft: "5em" }}>
          <h1>No records found</h1>
          <p>Please add new records</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="main"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "20px",
        }}
      >
        <PaginationShared
          setOffset={setOffset}
          limit={limit}
          offset={offset}
          count={count}
        />
        <div>
        <select
          className="custom-select"
          style={{borderRadius:"3px"}}
          onChange={(e) => {
            setLimit((prev) => e.target.value);
            let noOfPages = Math.ceil(count / e.target.value);
            setOffset(1);
          }}
        >
          <option value="1" selected={limit == 1}>
            1
          </option>
          <option value="2" selected={limit == 2}>
            2
          </option>
          <option value="5" selected={limit == 5}>
            5
          </option>
          <option value="10" selected={limit == 10}>
            10
          </option>
        </select>
        </div>

      </div>
      <table className="table">
        <thead>
          <tr key={Math.random()}>{headerForTable}</tr>
        </thead>
        <tbody>{dataForTable}</tbody>
      </table>
    </>
  );
};

export default Table;
