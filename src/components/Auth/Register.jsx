import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";

import { toast } from "react-toastify";

import { authApi } from "../../api/api.auth";

import { connect } from "react-redux";

const Register = (props) => {
  const fileInputRef = useRef(null);

  const [isRegistered, setisRegistered] = useState(false);
  const [registerForm, setregisterForm] = useState({
    email: "admin.caldera@gmail.com",
    password: "12345",
    full_name: "Caldera",
    avatar_file: null,
  });

  const handleChange = (key, value) => {
    setregisterForm({ ...registerForm, [key]: value });
  };

  const handleRegister = async () => {
    try {
      if (
        registerForm.full_name &&
        registerForm.email &&
        registerForm.password &&
        registerForm.avatar_file
      ) {
        const payload = new FormData();
        payload.append("full_name", registerForm.full_name);
        payload.append("email", registerForm.email);
        payload.append("password", registerForm.password);
        payload.append("avatar_file", registerForm.avatar_file);
        const result = await authApi.register(registerForm);
        if (result.status === "SUCCESS" && result.message === "SUCCESS") {
          toast.success("Akun Anda berahasil didaftarkan. Silakan login.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
          });
          setisRegistered(true);
          props.handleClose();
        } else {
          switch (result.message) {
            case "EMAIL_ALREADY_USED":
              toast.error("Email sudah terdaftar!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
              });
              break;
            case "MISSING_REQUIRED_DATA":
              toast.error("Data yang dimasukan tidak sesuai!", {
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
      } else {
        toast.info("Mohon untuk mengisi semua data pendaftaran.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
        });
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
      {isRegistered ? (
        <div style={{ background: "#476425" }}>
          <p style={{ color: "#ecefe9" }}>
            Akun anda berhasil didaftarkan, silakan login terlebih dahulu.
          </p>
        </div>
      ) : (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control
              value={registerForm.full_name}
              required
              onChange={(e) => {
                handleChange("full_name", e.target.value);
              }}
              type="text"
              placeholder="Masukan Nama..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control
              value={registerForm.email}
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
              value={registerForm.password}
              required
              onChange={(e) => {
                handleChange("password", e.target.value);
              }}
              type="password"
              placeholder="Masukan Kata Sandi..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Foto Profil</Form.Label>
            <Form.Control
              required
              innerRef={fileInputRef}
              multiple={false}
              onChange={(e) => {
                handleChange("avatar_file", e.target.files[0]);
              }}
              type="file"
              placeholder="Pilih gambar..."
              accept={".png,.jpg,.jpeg,.bmp"}
            />
          </Form.Group>
          <Form.Group className="d-grid mt-4">
            <Button
              onClick={async () => {
                await handleRegister();
              }}
            >
              Daftar
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

export default connect(mapStateToProps)(Register);
