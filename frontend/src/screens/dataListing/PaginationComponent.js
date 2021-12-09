import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";

const PaginationComponent = ({ pageHandler }) => {
  const [activebtn, setActive] = useState(1);

  const dataSearched = useSelector((state) => state.dataSearched);
  const { searchedData } = dataSearched;
  if (searchedData) {
    var pagesNumber = Math.ceil(searchedData.length / 20);
  }

  const items = [];

  const onClickHandler = (e) => {
    setActive(parseInt(e.target.innerHTML));
  };
  useEffect(() => {
    setActive(1);
  }, [dataSearched]);

  useEffect(() => {
    pageHandler(activebtn);
  }, [activebtn]);

  for (let number = 1; number <= pagesNumber; number++) {
    items.push(
      <Pagination.Item
        key={number}
        value={number}
        onClick={onClickHandler}
        active={number === activebtn}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div style={{ marginLeft: "45% ", marginTop: "30px" }}>
      <Pagination data-testid="pagination" size="lg">
        {items}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;
