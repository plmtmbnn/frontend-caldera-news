import React from "react";
import { Breadcrumb, Button, Layout } from "antd";

import SidebarAdmin from "../layouts/Sider";
import TablePost from "./components/TablePost";
const { Header, Content, Footer } = Layout;

function CreatePost() {
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
            <Breadcrumb.Item>Post</Breadcrumb.Item>
            <Breadcrumb.Item>Create Posts</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <div className="mb-5 d-flex">
              <h4 className="w-100">List Posts</h4>
              <Button type="primary" className="float-end">
                Create New Post
              </Button>
            </div>
            <TablePost />
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
