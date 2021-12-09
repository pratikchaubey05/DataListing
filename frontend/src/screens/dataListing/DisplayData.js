import React from "react";
import { Card, Button } from "react-bootstrap";

const DisplayData = ({ data, editHandler }) => {
  const { id, title, body } = data;
  return (
    <Card
      style={{
        marginBottom: "10px",
      }}
    >
      <Card.Body>
        <Card.Title data-testid="cardTitle">{title}</Card.Title>
        <Card.Text style={{ marginTop: "12%" }}>{body}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={editHandler}
          value={id}
          variant="primary"
          data-testid="editButton"
        >
          Edit
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default DisplayData;
