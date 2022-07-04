import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

// images
import logo from "../assets/logo.png";

const NavbarApp = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Navbar className="bg-navbar py-4" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" style={{ width: "180px" }} />
        </Link>
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
            <Button className="px-4 fw-bold" onClick={handleShow}>
              Masuk
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="text-center">
          <h4 className="fw-bold mt-3">Masuk</h4>
          <p>Login dulu biar bisa komen, dan like konten favoritmu. Yuk!</p>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

export default NavbarApp;
