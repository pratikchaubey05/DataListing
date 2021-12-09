import { Col, Row } from "react-bootstrap";
import "./App.css";
import Header from "./components/Header";
import DataListing from "./screens/dataListing/DataListing";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Row>
          <Col md={12}>
            <DataListing />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default App;
