import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

function FooterApp() {
  return (
    <footer className="bg-dark py-5 text-white">
      <Container>
        <Row>
          <Col md={3} className="align-self-center">
            <img src={logo} alt="" style={{ width: "180px" }} />
            <h6 className="text-muted mt-5">© 2022 Allright reserved</h6>
          </Col>
          <Col md={{ span: 2, offset: 3 }}>
            <h5 className="mb-4 fw-bold">Menu</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/#">Home</Link>
              </li>
              <li>
                <Link to="/#">Peristiwa</Link>
              </li>
              <li>
                <Link to="/#">Budaya</Link>
              </li>
              <li>
                <Link to="/#">Pertanian</Link>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5 className="mb-4 fw-bold">Caldera</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/#">Syarat dan Ketentuan</Link>
              </li>
              <li>
                <Link to="/#">Tentang Kami</Link>
              </li>
              <li>
                <Link to="/#">Hubungi Kami</Link>
              </li>
              <li>
                <Link to="/#">Kebijakan Pribadi</Link>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5 className="mb-4 fw-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li>caldera@gmail.com</li>
              <li>021 1234 5678</li>
              <li>Balige, Indonesia</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterApp;
