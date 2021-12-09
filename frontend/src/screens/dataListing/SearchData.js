import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSearchedData, resetAll } from "../../actions/dataActions";

const SearchData = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getSearchedData(searchTitle));
  };

  // Reset Handler
  const resetHandler = (e) => {
    e.preventDefault();
    dispatch(resetAll());
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Label>Search by Title: </Form.Label>
      <br />
      <Form.Control
        role="input"
        type="text"
        size="lg"
        name="q"
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="Title here..."
        className="w-50 d-inline mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button
        type="submit"
        variant="success"
        className="p-2 d-inline"
        style={{ marginLeft: "20px", marginBottom: "8px" }}
      >
        Search
      </Button>
      <Button
        onClick={resetHandler}
        type="reset"
        variant="danger"
        className="p-2 d-inline"
        style={{ marginLeft: "20px", marginBottom: "8px" }}
      >
        Reset All
      </Button>
    </Form>
  );
};

export default SearchData;
