import React, { useState } from "react";
import { Breadcrumb, Layout } from "antd";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import SidebarAdmin from "../layouts/Sider";
import UploadImage from "./components/UploadImage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Header, Content, Footer } = Layout;

function CreatePost() {
  const [value, setValue] = useState("");
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
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <Link to="/admin/post">Post</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Create Post</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div className="mb-3 d-flex">
              <h4 className="w-100">Create Post</h4>
            </div>
            <Row>
              <Col md={8}>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label>Judul</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tulis Judul Artikel"
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Kategori</Form.Label>
                    <Form.Select>
                      <option>Pilih Kategori</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Featured Image</Form.Label>
                    <br />
                    <UploadImage />
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label>Konten</Form.Label>
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={setValue}
                    />
                  </Form.Group>
                  <Button variant="light" className="me-3">
                    Cancel
                  </Button>
                  <Button variant="outline-primary" className="me-3">
                    Save to Draft
                  </Button>
                  <Button variant="primary" type="submit" className="me-3 px-5">
                    Post Artikel
                  </Button>
                </Form>
              </Col>
            </Row>
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

export default CreatePost;
