import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Row,
  Col,
  NavLink,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// images
import logo from "../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";

//component
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import { connect } from "react-redux";
import { resetUser } from "../redux/action/user_action";


// api
import { newsApi } from "../api/api.news";

const NavbarApp = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const [checkToken, setcheckToken] = useState(false);
  const getcheckToken = async () => {
    const result = await newsApi.checkToken();
    console.log(result);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setcheckToken(false);
    } else {
      localStorage.setItem(
        "_CALDERA_",
        JSON.stringify({
          id: 3,
          full_name: "",
          email: "",
          avatar_url: "",
          created_at: "",
          isAdmin: false,
          isAuthor: false,
          token: "xxx",
        })
      );
      props.dispatch(resetUser());
      setcheckToken(false);
    }
  };

  useEffect(() => {
    getcheckToken();
  }, []);

  return (
    <Navbar className="bg-navbar py-4" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="" style={{ width: "180px" }} />
        </Link>
        <Navbar.Toggle>
          <AiOutlineMenu className="text-white" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto link-navbar">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/category/peristiwa" className="nav-link">
              Peristiwa
            </Link>
            <Link to="/category/pariwisata" className="nav-link">
              Pariwisata
            </Link>
            <Link to="/category/politik" className="nav-link">
              Politik
            </Link>
            <NavDropdown title="Lainnya" id="basic-nav-dropdown">
              <Link className="dropdown-item" to="/category/budaya-pendidikan">
                Budaya/Pendidikan
              </Link>
              <Link
                className="dropdown-item"
                to="/category/lingkungan-kesehatan"
              >
                Lingkungan/Kesehatan
              </Link>
              <Link className="dropdown-item" to="/category/pertanian-ekonomi">
                Pertanian/Ekonomi
              </Link>
              <Link className="dropdown-item" to="/category/calderapedia">
                CalderaPedia
              </Link>
            </NavDropdown>
          </Nav>
          <hr className="d-md-none" />
          <Nav className="ms-auto link-navbar">
            {props.user && props.user.full_name ? null : (
              <NavLink className="d-grid">
                <Button
                  variant="outline-primary"
                  className="fw-bold px-4"
                  onClick={handleShowRegister}
                >
                  Daftar
                </Button>
              </NavLink>
            )}

            {props.user && props.user.full_name ? (
              <Row className="mt-4 mt-md-0">
                <Col xs={4} md={6}>
                  {props.user.isAuthor ? (
                    <Link to="/admin/post" className="btn btn-primary mb-2">
                      Dashboard
                    </Link>
                  ) : (
                    <h5 style={{ color: "white" }} className="bg-link">
                      {props.user.full_name + ", "}
                    </h5>
                  )}
                </Col>
                <Col xs={4} md={6}>
                  <Button
                    variant="warning"
                    onClick={() => {
                      localStorage.setItem(
                        "_CALDERA_",
                        JSON.stringify({
                          id: 3,
                          full_name: "",
                          email: "",
                          avatar_url: "",
                          created_at: "",
                          isAdmin: false,
                          isAuthor: false,
                          token: "xxx",
                        })
                      );
                      props.dispatch(resetUser());
                    }}
                  >
                    Keluar
                  </Button>
                </Col>
              </Row>
            ) : (
              <NavLink className="d-grid mt-md-0 mt-2">
                <Button className="px-4 fw-bold" onClick={handleShowLogin}>
                  Masuk
                </Button>
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="fw-bold mt-2">Pendaftaran Akun Baru</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register
            handleClose={() => {
              handleCloseRegister();
            }}
          />
        </Modal.Body>
      </Modal>
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="fw-bold mt-2">Masuk</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login
            handleClose={() => {
              handleCloseLogin();
            }}
          />
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
