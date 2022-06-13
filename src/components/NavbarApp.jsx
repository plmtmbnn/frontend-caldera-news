import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// images
import logo from "../assets/logo.png";

const NavbarApp = () => {
  return (
    <Navbar className="bg-navbar py-4" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="" style={{ width: "180px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto link-navbar">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/category/peristiwa" className="nav-link">
              Peristiwa
            </Link>
            <Link to="/category/parawisata" className="nav-link">
              Parawisata/Budaya
            </Link>
            <Link to="/category/pertanian" className="nav-link">
              Pertanian
            </Link>
          </Nav>
          <Nav className="ms-auto link-navbar">
            <Button className="px-4 fw-bold">Masuk</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarApp;
