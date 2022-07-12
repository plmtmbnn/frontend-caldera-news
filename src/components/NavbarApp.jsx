import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Modal, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// images
import logo from "../assets/logo.png";

//component
import Login from './Auth/Login';
import Register from './Auth/Register';

import { connect } from "react-redux";
import {resetUser} from '../redux/action/user_action';


const NavbarApp = (props) => {
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
            {
              props.user && props.user.full_name ?
              <Row>
                <Col>
                  {
                      props.user.isAdmin ?
                      <Link to="/admin/post">
                        <Button variant="primary">Dashboard</Button>
                      </Link>
                      :
                        <h5 style={{color: 'white'}} className='bg-link'>{props.user.full_name+", "}</h5>
                  }
                  
                </Col>
                <Col>
                  <Button variant="warning"
                  onClick={()=> {
                      localStorage.setItem("_CALDERA_", JSON.stringify({
                        "id": 3,
                        "full_name": "",
                        "email": "",
                        "avatar_url": "",
                        "created_at": "",
                        "isAdmin": false,
                        "token": ""
                      }));
                      props.dispatch(resetUser());
                  }}
                  >Keluar</Button>
                </Col>
              </Row>
              :
              <Button className="px-4 fw-bold" onClick={handleShow}>
              Masuk
            </Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="text-center">
          <h4 className="fw-bold mt-3">Masuk</h4>
          <p>Login dulu biar bisa komen, dan like konten favoritmu. Yuk!</p>
          <Row>
            <Login />
          </Row>
        </Modal.Body>
      </Modal>
    </Navbar>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(NavbarApp);
