import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { editDataForm, searchEditDataForm } from "../../actions/dataActions";
import "./AutoCompleteText.css";

const EditDataForm = () => {
  const dispatch = useDispatch();

  const [ctitle, setcTitle] = useState("");
  const [cbody, setcBody] = useState("");
  const [cuserId, setcUserId] = useState("");

  // DESC: for checking all entries are there
  const [allEntries, setAllEntries] = useState(false);
  // DESC: to check if the Auto is clicked
  const [autoClicked, setAutoClicked] = useState(false);

  // DESC: To Display error messages
  const [errorMessage, setErrorMessage] = useState("");

  const editData = useSelector((state) => state.editFormData);
  const { editForm, message } = editData;
  const { userId = "", id = "", title = "", body = "" } = editForm;

  // DESC: For AutoComplete
  const dataList = useSelector((state) => state.dataList);
  const { allData } = dataList;
  const [searchMatch, setSearchMatch] = useState([]);

  useEffect(() => {
    setcTitle(title);
    setcBody(body);
    setcUserId(userId);

    // if (message) {
    //   setErrorMessage(message);
    // }
  }, [id, title, userId, body, message]);

  useEffect(() => {
    if (cuserId) {
      setErrorMessage("");
    }

    if (ctitle && cbody) {
      setAllEntries(true);
    } else {
      setAllEntries(false);
      setErrorMessage("*Note: Title and Body are Required Fields.");
    }
  }, [ctitle, cbody, cuserId]);

  const submitHandler = (e) => {
    // so that page doesnt refresh
    e.preventDefault();
    if (ctitle && cbody && userId) {
      dispatch(editDataForm({ ctitle, cbody, id, cuserId }));
    } else {
      setErrorMessage(
        "Valid UserID, Title and Body is required to Update the Data!!! "
      );
    }
    setSearchMatch([]);
  };

  useEffect(() => {
    if (ctitle) {
      dispatch(searchEditDataForm(ctitle));
    }
    setAutoClicked(false);
  }, [autoClicked]);

  const searchHandler = (e) => {
    // so that page doesnt refresh
    e.preventDefault();
    setSearchMatch([]);

    setcTitle(e.target.value);
    setAutoClicked(true);
  };

  // DESC: For Autocomplete

  const searchTitleHandler = (e) => {
    setcTitle(e.target.value);

    if (e.target.value) {
      const searchKey = e.target.value;
      let matches = allData.filter((element) => {
        const regex = new RegExp(`${searchKey}`, "gi");
        return element.title.match(regex);
      });
      setSearchMatch(matches);
    } else {
      setSearchMatch([]);
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler} style={{ width: "90%" }}>
        <Form.Group controlId="title">
          <Form.Label>
            <b data-testid="edit-form-title-label">Title:</b>
          </Form.Label>
          <br />
          {/* DESC: AUTOComplete */}
          <div>
            <Form.Control
              type="text"
              placeholder="Search By Title"
              value={ctitle}
              onChange={(e) => searchTitleHandler(e)}
              className="d-inline"
              style={{ width: "100%" }}
              data-testid="edit-form-title-input"
            ></Form.Control>
            <br />
            {searchMatch.length > 0 && (
              <div
                className="FixedHeightContainer"
                data-testid="edit-form-autocomplete"
              >
                <div className="Content">
                  {searchMatch.map((item, index) => {
                    return (
                      <div key={index}>
                        <button
                          className="auto-buttons"
                          value={item.title}
                          onClick={searchHandler}
                        >
                          {item.title}
                        </button>
                        <hr className="hr-auto" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Form.Group>

        <Form.Group controlId="body">
          <Form.Label className="dataBody">
            <b data-testid="edit-body-label">Body:</b>
          </Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            placeholder="Enter Body Text"
            value={cbody}
            onChange={(e) => setcBody(e.target.value)}
            data-testid="edit-body-input"
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          disabled={!allEntries}
          variant="primary"
          className="my-4"
          data-testid="edit-update-button"
        >
          Update
        </Button>
        {errorMessage && (
          <Alert
            data-testid="edit-alert-message"
            className="mt-4 mx-4 text-center"
            variant="danger"
          >
            {errorMessage}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default EditDataForm;
