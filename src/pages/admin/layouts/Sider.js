import { FileTextOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [getItem("Post", "2", <FileTextOutlined />)];

const SidebarAdmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo-admin" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["2"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SidebarAdmin;
