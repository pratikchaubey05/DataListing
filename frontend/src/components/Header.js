import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar bg="primary" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="mx-3">
            <i className="fas fa-clipboard"></i>
            <strong> Data Listing</strong>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
