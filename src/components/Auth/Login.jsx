import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { toast } from "react-toastify";

import { authApi } from "../../api/api.auth";

import { connect } from "react-redux";
import { updateUser } from "../../redux/action/user_action";
const Login = (props) => {
  const [isLogin, setisLogin] = useState(false);

  const [loginForm, setloginForm] = useState({email: '', password: ''});

  const handleChange = (key, value) => {
    setloginForm({ ...loginForm, [key]: value });
  };

  const handleLogin = async () => {
    try {
      toast.info("Sedang diproses...", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      const result = await authApi.login(loginForm);
      if (result.status === "SUCCESS" && result.message === "SUCCESS") {
        toast.success("Berhasil masuk!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
        props.dispatch(updateUser(result.data));
        setisLogin(true);
        props.handleClose();
      } else {
        switch (result.message) {
          case "USER_NOT_REGISTERED_YET":
            toast.error("Akun Anda belum terdaftar!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            });
            break;
          case "INVALID_EMAIL_OR_PASSWORD":
            toast.error("Email atau Kata Sandi tidak sesuai!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            });
            break;
          default:
            toast.error("Kesalahan Sistem!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
            });
            break;
        }
      }
    } catch (error) {
      toast.error("Kesalahan Sistem!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      {isLogin ? (
        <div style={{ background: "#476425" }}>
          <p style={{ color: "#ecefe9" }}>
            Akun anda sudah masuk, silakan menikmati fitur app ini.
          </p>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control
              value={loginForm.email}
              required
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
              type="email"
              placeholder="Masukan Alamat Email..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Kata Sandi</Form.Label>
            <Form.Control
              value={loginForm.password}
              required
              onChange={(e) => {
                handleChange("password", e.target.value);
              }}
              type="password"
              placeholder="Masukan Kata Sandi..."
            />
          </Form.Group>
          <Form.Group className="d-grid mt-4">
            <Button
              onClick={async () => {
                await handleLogin();
              }}
            >
              Masuk
            </Button>
          </Form.Group>
        </Form>
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Login);
