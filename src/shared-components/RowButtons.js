import React from "react";

const RowButtons = ({
  handleUpdate,
  handleDelete,
  handleView,
  itemData,
  isUpdateButton,
  isDeleteButton,
  isViewButton,

  isDeposite,
  isWithdraw,
  isTransfer,
  handleDeposite,
  handleWithdraw,
  handleTransfer,
}) => {
  let Blist = [];

  if (isUpdateButton) {
    Blist.push(
      <button
      key={1}
        type="button"
        className="btn btn-primary"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleUpdate(itemData);
        }}
      >
        Update
      </button>
    );
  }
  if (isDeleteButton) {
    Blist.push(
      <button
      key={2}
        type="button"
        className="btn btn-danger"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleDelete(itemData);
        }}
      >
        Delete
      </button>
    );
  }
  if (isViewButton) {
    Blist.push(
      <button
      key={3}
        type="button"
        className="btn btn-warning"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleView(itemData);
        }}
      >
        View
      </button>
    );
  }
  if (isDeposite) {
    Blist.push(
      <button
      key={4}
        type="button"
        className="btn btn-success"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleDeposite(itemData);
        }}
      >
        Deposite
      </button>
    );
  }
  if (isWithdraw) {
    Blist.push(
      <button
      key={5}
        type="button"
        className="btn btn-danger"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleWithdraw(itemData);
        }}
      >
        Withdraw
      </button>
    );
  }
  if (isTransfer) {
    Blist.push(
      <button
      key={6}
        type="button"
        className="btn btn-primary"
        style={{ margin: "0.5rem" }}
        onClick={() => {
          handleTransfer(itemData);
        }}
      >
        Transfer
      </button>
    );
  }

  return (
    <>
      <div>{Blist}</div>
    </>
  );
};

export default RowButtons;
