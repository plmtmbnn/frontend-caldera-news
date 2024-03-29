import { FileTextOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { connect } from "react-redux";


// api
import { newsApi } from "../../../api/api.news";

import { toast } from "react-toastify";

const { Sider } = Layout;

const SidebarAdmin = (props) => {
  
  const [checkToken, setcheckToken] = useState(false);
  const getcheckToken = async () => {
    const result = await newsApi.checkToken();
    if (result.status === "SUCCESS" && result.message === "SUCCESS") {
      setcheckToken(false);
    } else {
      toast.info("Sesi habis, silakan login kembali.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
      });

      if (typeof window !== 'undefined') {
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
      }

      setTimeout(()=> {
        window.location.href = "/";
      }, 5000);
      setcheckToken(false);
    }
  };

  useEffect(() => {
    getcheckToken();
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const params = useParams();
  let location = useLocation();

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
      case "/update-password":
        key = "5";
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
        <Menu.Item key="4" hidden={
          props.user.isAdmin ? false : true
        }>
          <FileTextOutlined />
          <span>Daftar Review Berita</span>
          <Link to="/admin/review" />
        </Menu.Item>
        <Menu.Item key="1">
          <FileTextOutlined />
          <span>Daftar Berita</span>
          <Link to="/admin/post" />
        </Menu.Item>
        <Menu.Item key="3" hidden={
          props.user.isAdmin ? false : true
        }>
          <FileTextOutlined />
          <span>Daftar Pengguna</span>
          <Link to="/admin/user" />
        </Menu.Item>
        <Menu.Item key="5">
          <FileTextOutlined />
          <span>Ubah Password</span>
          <Link to="/update-password" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(SidebarAdmin);