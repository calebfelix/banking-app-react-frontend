import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationShared = ({
  limit,
  offset,
  count,
  setOffset,
  handelAllUsers,
}) => {
  let paginationItemMapping;
  let PrevComponent;
  let NextComponent;
 const noOfPages = Math.ceil(count / limit)

  paginationItemMapping = Array.from({ length: noOfPages }, (_, index) => {
    return (
      <Pagination.Item
        key={index + 1}
        active={offset === index + 1}
        onClick={(e) => {
          setOffset(index + 1);
        }}
      >
        {index + 1}
      </Pagination.Item>
    );
  });

  PrevComponent = () => {
    return (
      <Pagination.Item
        onClick={(e) => {
          setOffset((prev) => {
            if (prev - 1 <= 0) {
              return noOfPages;
            }
            return prev - 1;
          });
        }}
      >
        {" "}
        prev
      </Pagination.Item>
    );
  };

  NextComponent = () => {
    return (<>
      <Pagination.Item
        onClick={(e) => {
          setOffset((prev) => {
            if (prev + 1 > noOfPages) {
              return 1;
            }
            return prev + 1;
          });
        }}
      >
        {" "}
        Next
      </Pagination.Item>
      </>
    );
  };

  return (
    <>
      <Pagination>
        <PrevComponent />
        {paginationItemMapping}
        <NextComponent />

      </Pagination>
    </>
  );
};

export default PaginationShared;
