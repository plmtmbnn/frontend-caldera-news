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
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

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
              null
              :
              <Button className="px-4 fw-bold" onClick={handleShowRegister}>
                Daftar
            </Button>
            }
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
              <Button className="px-4 fw-bold" onClick={handleShowLogin}>
              Masuk
            </Button>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Row>
        <Modal show={showRegister} onHide={handleCloseRegister}>
          <Modal.Body className="text-center">
            <h4 className="fw-bold mt-3">Pendaftaran Akun Baru</h4>
            <Row>
              <Col>
              <Register handleClose={()=> {handleCloseRegister()}}/>
              </Col>            
            </Row>
          </Modal.Body>
        </Modal>
      </Row>
      <Row>
        <Modal show={showLogin} onHide={handleCloseLogin}>
          <Modal.Body className="text-center">
            <h4 className="fw-bold mt-3">Masuk</h4>
            <Row>
              <Col>
              <Login handleClose={()=> {handleCloseLogin()}}/>
              </Col>            
            </Row>
          </Modal.Body>
        </Modal>
      </Row>      
    </Navbar>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(NavbarApp);
