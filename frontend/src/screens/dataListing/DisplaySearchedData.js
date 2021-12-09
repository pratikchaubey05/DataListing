import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import DisplayData from "./DisplayData";
import { Row, Col } from "react-bootstrap";
import { populateData } from "../../actions/dataActions";
import EditModal from "../EditData/EditModal";

const DisplaySearchedData = ({ pagenum, searchedData, dataSearched }) => {
  // const dataSearched = useSelector((state) => state.dataSearched);
  // const { searchedData } = dataSearched;
  const [displayDataArr, setDisplayDataArr] = useState([]);

  useEffect(() => {
    if (searchedData && pagenum) {
      const arr = searchedData.filter((ele, index) => {
        if (index >= 20 * (pagenum - 1) && index < 20 * pagenum) {
          return ele;
        }
        return false;
      });

      setDisplayDataArr(arr);
    }
  }, [pagenum, searchedData, dataSearched]);

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  const editHandler = (e) => {
    e.preventDefault();
    setModalShow(true);
    const id = e.target.value;
    dispatch(populateData(id));
  };

  return (
    <div>
      <p data-testid="match-found-text">{searchedData.length} Matches Found</p>

      <EditModal show={modalShow} onHide={() => setModalShow(false)} />

      <Row>
        {displayDataArr.map((element) => {
          return (
            <Col
              key={element.id}
              ax={12}
              sm={6}
              md={4}
              lg={3}
              className="d-flex align-items-stretch"
            >
              <DisplayData editHandler={editHandler} data={element} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default DisplaySearchedData;
