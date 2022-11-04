import React, { useState, useEffect } from "react";
import { Layout, Space, Table, Tag, Form, Input } from "antd";
import { Button } from "react-bootstrap";

import SidebarAdmin from "../layouts/Sider";

import { toast } from "react-toastify";

import { authApi } from "../../../api/api.auth";

import { connect } from "react-redux";

const { Header, Content, Footer } = Layout;

function UpdatePassword(props) {
  

  const updatePassword = async (data) => {
    const result = await authApi.updatePassword(data);
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      toast.success("Sukses ubah kata sandi.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    } else {
      toast.error("Gagal.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
    }
  };


  const onFinish = async (values) => {
    console.log('Success:', values, props.user);
    const password = values.password;
    const confirmPassword = values.confirm_password;
    if(password !== confirmPassword) {
      toast.info("Kata sandi dan konfirmasi kata sandi harus sama", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });
      return false;
    }
    const  payload = {
      password,
      user_id: props.user.id
    }
    await updatePassword(payload);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <SidebarAdmin />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div className="mb-5 d-flex">
              <h4 className="w-100">Ubah Password</h4>
            </div>
            <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Kata Sandi"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Konfirmasi Kata Sandi"
        name="confirm_password"
        rules={[
          {
            required: true,
            message: 'Please input your confirm_password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Caldera ©2022
        </Footer>
      </Layout>
    </Layout>
  );
}


function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(UpdatePassword);
