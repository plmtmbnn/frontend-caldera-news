import { FileTextOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const { Sider } = Layout;

const SidebarAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const params = useParams();
  let location = useLocation();

  useEffect(() => {});

  const getKey = () => {
    let key = null;
    switch (location.pathname) {
      case "/admin/post":
        key = "1";
        break;
      case "/admin/post/create":
        key = "2";
        break;
      case "/admin/user":
        key = "3";
        break;
      case "/admin/review":
        key = "4";
        break;
      default:
        break;
    }
    return key;
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
    >
      <div className="logo-admin" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        selectedKeys={[getKey()]}
      >
        <Menu.Item key="0">
          <FileTextOutlined />
          <span>Halaman Utama</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2">
          <FileTextOutlined />
          <span>Buat Berita</span>
          <Link to="/admin/post/create" />
        </Menu.Item>        
        <Menu.Item key="4">
          <FileTextOutlined />
          <span>Daftar Review Berita</span>
          <Link to="/admin/review" />
        </Menu.Item>
        <Menu.Item key="1">
          <FileTextOutlined />
          <span>Daftar Berita</span>
          <Link to="/admin/post" />
        </Menu.Item>
        <Menu.Item key="3">
          <FileTextOutlined />
          <span>Daftar Pengguna</span>
          <Link to="/admin/user" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SidebarAdmin;
