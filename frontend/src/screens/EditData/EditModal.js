import React from "react";
import { Modal } from "react-bootstrap";
import EditDataForm from "./EditDataForm";

const EditModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          data-testid="editmodaltitle"
        >
          Edit Form:
        </Modal.Title>
        <span onClick={props.onHide} style={{ marginRight: "5%" }}>
          <i className="fas fa-times"></i>
        </span>
      </Modal.Header>
      <Modal.Body>
        <EditDataForm />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
