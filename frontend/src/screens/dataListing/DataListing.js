import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllData } from "../../actions/dataActions";
import DisplaySearchedData from "./DisplaySearchedData";
import SearchData from "./SearchData";
import { Alert } from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";

const DataListing = () => {
  const dispatch = useDispatch();
  //loader
  const dataList = useSelector((state) => state.dataList);
  const { loading } = dataList;

  const dataSearched = useSelector((state) => state.dataSearched);
  const { searchedData, message } = dataSearched;

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const pageHandler = (pagenum) => {
    if (pagenum) {
      setPageNumber(pagenum);
    }
  };

  return (
    <div>
      <Container>
        <SearchData />
        {message ? (
          <Alert className="w-50 mt-4 mx-4 text-center" variant="danger">
            {message}
          </Alert>
        ) : loading ? (
          <Spinner
            style={{ marginLeft: "50%", marginTop: "10%" }}
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : searchedData.length > 0 ? (
          <DisplaySearchedData
            pagenum={pageNumber}
            searchedData={searchedData}
            dataSearched={dataSearched}
          />
        ) : (
          <Alert className="w-50 mt-4 text-center" variant="primary">
            * Note: Use SearchBox to display the Data!!!
          </Alert>
        )}
      </Container>
      <PaginationComponent pageHandler={pageHandler} />
    </div>
  );
};

export default DataListing;
