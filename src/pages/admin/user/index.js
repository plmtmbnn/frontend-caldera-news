import React, {useState, useEffect} from "react";
import { Layout, Space, Table, Tag } from "antd";
import { Button } from 'react-bootstrap';

import SidebarAdmin from "../layouts/Sider";

import { toast } from 'react-toastify';


import {authApi} from '../../../api/api.auth';
import moment from "moment";

const { Header, Content, Footer } = Layout;

function AdminUser() {
  const [userList, setuserList] = useState([]);
  const [filterUser, setfilterUser] = useState({
    full_name: null,
    email: null
  });

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const result = await authApi.userList(filterUser);
    if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
      setuserList(result.data);
    } else {
      setuserList([]);
    }    
  }

  const handleUserStatus = async (data, action) => {
      const result = await authApi.updateUserStatus(action, data.id);
      if(result.status === 'SUCCESS' && result.message === 'SUCCESS'){
        await getUserList();
        toast.success("Sukses." , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          });
      } else {
        toast.error("Gagal." , {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          });
      }
  }

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
              <h4 className="w-100">Daftar Pengguna</h4>
            </div>
            <Table             
            columns={
              [
                  {
                    title: "id",
                    dataIndex: "id",
                    key: "id",
                    render: (text) => <p>{text}</p>,
                  },
                  {
                    title: "Status",
                    dataIndex: "user_status",
                    key: "user_status",
                    defaultSortOrder: 'ascend',
                    sorter: (a, b) => a.user_status.length - b.user_status.length,
                    render: (text) => <p>{text}</p>,
                  },
                  {
                    title: "Nama",
                    dataIndex: "full_name",
                    key: "full_name",
                    sorter: (a, b) => a.full_name.length - b.full_name.length,
                    render: (text) => <p>{text}</p>,
                  },
                  {
                    title: "Email",
                    dataIndex: "email",
                    key: "email",
                    sorter: (a, b) => a.email.length - b.email.length,
                    render: (text) => <p>{text}</p>,
                  },
                  {
                    title: "Tgl Pendaftaran",
                    dataIndex: "created_at",
                    key: "created_at",
                    sorter: (a, b) => a.created_at.length - b.created_at.length,
                    render: (text) => <p>{moment(text).format('DD/MM/YYYY')}</p>,
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                      <Space size="middle">
                          <Button
                            onClick={()=> {
                              handleUserStatus(record, record.user_status === 'Pembaca' ? 'SET_TO_AUTHOR' : 'SET_TO_READER');
                            }}
                            variant={record.user_status === 'Pembaca' ? "success" : 'primary'}
                          >
                            {
                              record.user_status === 'Pembaca' ?
                              'Jadikan Penulis'
                              :
                              'Jadikan Pembaca'
                            }
                            </Button>
                      </Space>
                    ),
                  },                
              ]
            } dataSource={userList} />
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

export default AdminUser;
