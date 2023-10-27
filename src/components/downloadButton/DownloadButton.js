import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { getPassbook } from "../../services/transaction/transactions";
import { MessageError, MessageSuccess } from "../../error/Errors";
import Modal from "react-bootstrap/Modal";
const XLSX = require("xlsx");

const DownloadButton = ({ fromDate, toDate, accountId }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow((prev) => false);
  };
  const handleShow = () => {
    setShow((prev) => true);
  };

  const downloadSend = async () => {
    try {
      setShow((prev) => true);
      let filters = {
        fromDate: fromDate,
        toDate: toDate,
      };
      let response = await getPassbook(accountId, filters);
      if (response?.data) {
        console.log(response.data);
        setData((prev) => response.data);
      }
    } catch (error) {
      MessageError("could not download");
    }
  };

  const handleDownload = () => {
try {
    console.log("download");
    let timestamp = new Date().getTime();
    const workSheet = XLSX.utils.json_to_sheet(data);
    console.log(">>>>>>>>>>>>>>>>>>>", data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "data");
    // generate buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, `${timestamp}.xlsx`);
    MessageSuccess("file Downloaded Successfully");
} catch (error) {
    MessageError(error.message);
}
  };

  return (
    <>
      <Button variant="success" className="m-2" onClick={downloadSend}>
        Download
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You Want to Download this file?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleDownload}>
            Download
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DownloadButton;
